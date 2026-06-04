export type FeedbackEntry = {
  id: string;
  author: string;
  message: string;
  page: string;
  createdAt: string;
};

export type FeedbackStore = {
  entries: FeedbackEntry[];
};

export type FeedbackInput = {
  author?: string;
  message?: string;
  page?: string;
};

const MAX_MESSAGE_LENGTH = 4000;
const MAX_AUTHOR_LENGTH = 120;
const MAX_PAGE_LENGTH = 200;
const MAX_ENTRIES = 500;

export function emptyFeedbackStore(): FeedbackStore {
  return { entries: [] };
}

export function parseFeedbackStore(data: unknown): FeedbackStore {
  if (!data || typeof data !== "object" || !("entries" in data)) {
    return emptyFeedbackStore();
  }

  const entries = (data as { entries: unknown }).entries;
  if (!Array.isArray(entries)) {
    return emptyFeedbackStore();
  }

  const parsed: FeedbackEntry[] = [];
  for (const item of entries) {
    if (!item || typeof item !== "object") continue;
    const row = item as Partial<FeedbackEntry>;
    if (
      typeof row.id !== "string" ||
      typeof row.message !== "string" ||
      typeof row.createdAt !== "string"
    ) {
      continue;
    }
    parsed.push({
      id: row.id,
      author: typeof row.author === "string" ? row.author : "",
      message: row.message,
      page: typeof row.page === "string" ? row.page : "",
      createdAt: row.createdAt,
    });
  }

  return { entries: parsed };
}

export function validateFeedbackInput(input: FeedbackInput): {
  ok: true;
  value: { author: string; message: string; page: string };
} | { ok: false; error: string } {
  const message = input.message?.trim() ?? "";
  const author = input.author?.trim() ?? "";
  const page = input.page?.trim() ?? "";

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

export function createFeedbackEntry(
  value: { author: string; message: string; page: string }
): FeedbackEntry {
  return {
    id: crypto.randomUUID(),
    author: value.author,
    message: value.message,
    page: value.page,
    createdAt: new Date().toISOString(),
  };
}

export function appendFeedbackEntry(
  store: FeedbackStore,
  entry: FeedbackEntry
): FeedbackStore {
  const entries = [entry, ...store.entries].slice(0, MAX_ENTRIES);
  return { entries };
}

export function sortFeedbackEntries(entries: FeedbackEntry[]): FeedbackEntry[] {
  return [...entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** API used by the feedback form (dev server vs Netlify). */
export function getFeedbackApiUrl(): string {
  if (typeof window === "undefined") {
    return "/api/feedback";
  }
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "/api/feedback";
  }
  return "/.netlify/functions/feedback";
}

/** Live JSON for agents — same data as the API on Netlify. */
export function getFeedbackJsonUrl(): string {
  if (typeof window === "undefined") {
    return "/feedback.json";
  }
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "/feedback.json";
  }
  return "/.netlify/functions/feedback";
}

export function usesNetlifyFeedbackApi(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

export async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return {};
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(
      response.ok
        ? "Server returned an invalid response."
        : `Request failed (${response.status}). The feedback service may not be deployed yet.`
    );
  }
}
