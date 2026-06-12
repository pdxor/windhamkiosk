import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";

const STORE_NAME = "windham-kiosk-help-requests";
const BLOB_KEY = "requests";
const CATEGORIES = new Set(["resident", "volunteer", "business", "other"]);
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_PHONE = 40;
const MAX_TOWN = 80;
const MAX_MESSAGE = 4000;
const MAX_REQUESTS = 1000;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function getAdminSecret() {
  return process.env.HELP_REQUEST_ADMIN_SECRET?.trim() ?? "";
}

function isAuthorized(request) {
  const secret = getAdminSecret();
  if (!secret) {
    return false;
  }
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7) === secret;
  }
  return request.headers.get("x-help-inbox-key") === secret;
}

function parseStore(data) {
  if (!data || typeof data !== "object" || !Array.isArray(data.requests)) {
    return { requests: [] };
  }
  return { requests: data.requests };
}

function validateInput(payload) {
  const name = payload?.name?.trim() ?? "";
  const email = payload?.email?.trim() ?? "";
  const phone = payload?.phone?.trim() ?? "";
  const town = payload?.town?.trim() ?? "";
  const message = payload?.message?.trim() ?? "";
  const categoryRaw = payload?.category?.trim() ?? "resident";
  const category = CATEGORIES.has(categoryRaw) ? categoryRaw : "resident";

  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!email && !phone) {
    return {
      ok: false,
      error: "Please enter a phone number or email so we can reach you.",
    };
  }
  if (!message) {
    return { ok: false, error: "Please tell us a little about what you need." };
  }
  if (name.length > MAX_NAME) {
    return { ok: false, error: `Name must be ${MAX_NAME} characters or fewer.` };
  }
  if (email.length > MAX_EMAIL) {
    return { ok: false, error: `Email must be ${MAX_EMAIL} characters or fewer.` };
  }
  if (phone.length > MAX_PHONE) {
    return { ok: false, error: `Phone must be ${MAX_PHONE} characters or fewer.` };
  }
  if (town.length > MAX_TOWN) {
    return { ok: false, error: `Town must be ${MAX_TOWN} characters or fewer.` };
  }
  if (message.length > MAX_MESSAGE) {
    return {
      ok: false,
      error: `Message must be ${MAX_MESSAGE} characters or fewer.`,
    };
  }

  return {
    ok: true,
    value: { category, name, email, phone, town, message },
  };
}

async function readStore(store) {
  const data = await store.get(BLOB_KEY, { type: "json" });
  const parsed = parseStore(data);
  parsed.requests.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return parsed;
}

export default async function helpRequestHandler(request) {
  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    if (!isAuthorized(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
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
        ...validated.value,
        createdAt: new Date().toISOString(),
      };
      const requests = [entry, ...current.requests].slice(0, MAX_REQUESTS);
      requests.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      await store.setJSON(BLOB_KEY, { requests });

      return jsonResponse(
        {
          ok: true,
          id: entry.id,
          message:
            "Your request was received privately. Someone from the KIOSK will reach out when they can.",
        },
        201
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      return jsonResponse({ error: message }, 500);
    }
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}
