import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";

const STORE_NAME = "windham-kiosk-feedback";
const BLOB_KEY = "entries";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_AUTHOR_LENGTH = 120;
const MAX_PAGE_LENGTH = 200;
const MAX_ENTRIES = 500;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function parseStore(data) {
  if (!data || typeof data !== "object" || !Array.isArray(data.entries)) {
    return { entries: [] };
  }
  return { entries: data.entries };
}

function validateInput(payload) {
  const message = payload?.message?.trim() ?? "";
  const author = payload?.author?.trim() ?? "";
  const page = payload?.page?.trim() ?? "";

  if (!message) {
    return { ok: false, error: "Please enter your feedback." };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Feedback must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    };
  }
  if (author.length > MAX_AUTHOR_LENGTH) {
    return {
      ok: false,
      error: `Name must be ${MAX_AUTHOR_LENGTH} characters or fewer.`,
    };
  }
  if (page.length > MAX_PAGE_LENGTH) {
    return {
      ok: false,
      error: `Page or section must be ${MAX_PAGE_LENGTH} characters or fewer.`,
    };
  }

  return { ok: true, value: { author, message, page } };
}

async function readStore(store) {
  const data = await store.get(BLOB_KEY, { type: "json" });
  const parsed = parseStore(data);
  parsed.entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return parsed;
}

export default async function feedbackHandler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    try {
      return jsonResponse(await readStore(store));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      return jsonResponse({ error: message }, 500);
    }
  }

  if (request.method === "POST") {
    try {
      const payload = await request.json();
      const validated = validateInput(payload);
      if (!validated.ok) {
        return jsonResponse({ error: validated.error }, 400);
      }

      const current = await readStore(store);
      const entry = {
        id: randomUUID(),
        author: validated.value.author,
        message: validated.value.message,
        page: validated.value.page,
        createdAt: new Date().toISOString(),
      };
      const entries = [entry, ...current.entries].slice(0, MAX_ENTRIES);
      entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      await store.setJSON(BLOB_KEY, { entries });

      return jsonResponse({ entry, entries }, 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      return jsonResponse({ error: message }, 500);
    }
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}
