import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  appendHelpRequest,
  createHelpRequestEntry,
  emptyHelpRequestStore,
  parseHelpRequestStore,
  sortHelpRequests,
  validateHelpRequestInput,
  type HelpRequestEntry,
  type HelpRequestInput,
  type HelpRequestStore,
} from "./help-request";

const dataPath = path.join(process.cwd(), "data", "help-requests.json");

async function readJsonFile(): Promise<HelpRequestStore> {
  try {
    const raw = await readFile(dataPath, "utf8");
    return parseHelpRequestStore(JSON.parse(raw));
  } catch {
    return emptyHelpRequestStore();
  }
}

async function writeJsonFile(store: HelpRequestStore) {
  const payload = JSON.stringify(store, null, 2);
  await writeFile(dataPath, `${payload}\n`, "utf8");
}

export function getHelpRequestAdminSecret(): string {
  return (
    process.env.HELP_REQUEST_ADMIN_SECRET?.trim() ||
    "dev-help-inbox-key-change-me"
  );
}

export function isAuthorizedInboxRequest(request: Request): boolean {
  const secret = getHelpRequestAdminSecret();
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7) === secret;
  }
  const header = request.headers.get("x-help-inbox-key");
  return header === secret;
}

export async function readHelpRequestsFromDisk(): Promise<HelpRequestStore> {
  const store = await readJsonFile();
  return { requests: sortHelpRequests(store.requests) };
}

export async function addHelpRequest(
  input: HelpRequestInput
): Promise<
  { request: HelpRequestEntry; store: HelpRequestStore } | { error: string }
> {
  const validated = validateHelpRequestInput(input);
  if (!validated.ok) {
    return { error: validated.error };
  }

  const store = await readJsonFile();
  const request = createHelpRequestEntry(validated.value);
  const next = appendHelpRequest(store, request);
  next.requests = sortHelpRequests(next.requests);

  await writeJsonFile(next);

  return { request, store: next };
}
