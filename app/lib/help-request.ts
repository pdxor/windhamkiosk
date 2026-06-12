export type HelpRequestCategory =
  | "resident"
  | "volunteer"
  | "business"
  | "other";

export type HelpRequestEntry = {
  id: string;
  category: HelpRequestCategory;
  name: string;
  email: string;
  phone: string;
  town: string;
  message: string;
  createdAt: string;
};

export type HelpRequestStore = {
  requests: HelpRequestEntry[];
};

export type HelpRequestInput = {
  category?: string;
  name?: string;
  email?: string;
  phone?: string;
  town?: string;
  message?: string;
};

const CATEGORIES: HelpRequestCategory[] = [
  "resident",
  "volunteer",
  "business",
  "other",
];

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_PHONE = 40;
const MAX_TOWN = 80;
const MAX_MESSAGE = 4000;
const MAX_REQUESTS = 1000;

export const HELP_CATEGORY_LABELS: Record<HelpRequestCategory, string> = {
  resident: "Resident — connection or support",
  volunteer: "Volunteer — offer time or skill",
  business: "Business — partner or sponsor",
  other: "Other",
};

export function emptyHelpRequestStore(): HelpRequestStore {
  return { requests: [] };
}

export function parseHelpRequestStore(data: unknown): HelpRequestStore {
  if (!data || typeof data !== "object" || !("requests" in data)) {
    return emptyHelpRequestStore();
  }
  const requests = (data as { requests: unknown }).requests;
  if (!Array.isArray(requests)) {
    return emptyHelpRequestStore();
  }

  const parsed: HelpRequestEntry[] = [];
  for (const item of requests) {
    if (!item || typeof item !== "object") continue;
    const row = item as Partial<HelpRequestEntry>;
    if (
      typeof row.id !== "string" ||
      typeof row.name !== "string" ||
      typeof row.message !== "string" ||
      typeof row.createdAt !== "string" ||
      !CATEGORIES.includes(row.category as HelpRequestCategory)
    ) {
      continue;
    }
    parsed.push({
      id: row.id,
      category: row.category as HelpRequestCategory,
      name: row.name,
      email: typeof row.email === "string" ? row.email : "",
      phone: typeof row.phone === "string" ? row.phone : "",
      town: typeof row.town === "string" ? row.town : "",
      message: row.message,
      createdAt: row.createdAt,
    });
  }

  return { requests: parsed };
}

export function validateHelpRequestInput(input: HelpRequestInput): {
  ok: true;
  value: Omit<HelpRequestEntry, "id" | "createdAt">;
} | { ok: false; error: string } {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const town = input.town?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  const categoryRaw = input.category?.trim() ?? "resident";
  const category = CATEGORIES.includes(categoryRaw as HelpRequestCategory)
    ? (categoryRaw as HelpRequestCategory)
    : "resident";

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

export function createHelpRequestEntry(
  value: Omit<HelpRequestEntry, "id" | "createdAt">
): HelpRequestEntry {
  return {
    ...value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function appendHelpRequest(
  store: HelpRequestStore,
  entry: HelpRequestEntry
): HelpRequestStore {
  const requests = [entry, ...store.requests].slice(0, MAX_REQUESTS);
  return { requests };
}

export function sortHelpRequests(
  requests: HelpRequestEntry[]
): HelpRequestEntry[] {
  return [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getHelpRequestPostUrl(): string {
  if (typeof window === "undefined") {
    return "/api/help-request";
  }
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "/api/help-request";
  }
  return "/.netlify/functions/help-request";
}

export function getHelpRequestInboxUrl(): string {
  if (typeof window === "undefined") {
    return "/api/help-request";
  }
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "/api/help-request";
  }
  return "/.netlify/functions/help-request";
}

export const HELP_INBOX_STORAGE_KEY = "kiosk-help-inbox-token";
