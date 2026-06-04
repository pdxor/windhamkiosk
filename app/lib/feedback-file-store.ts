import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  appendFeedbackEntry,
  createFeedbackEntry,
  emptyFeedbackStore,
  parseFeedbackStore,
  sortFeedbackEntries,
  validateFeedbackInput,
  type FeedbackEntry,
  type FeedbackInput,
  type FeedbackStore,
} from "./feedback";

const dataPath = path.join(process.cwd(), "data", "feedback.json");
const publicPath = path.join(process.cwd(), "public", "feedback.json");

async function readJsonFile(filePath: string): Promise<FeedbackStore> {
  try {
    const raw = await readFile(filePath, "utf8");
    return parseFeedbackStore(JSON.parse(raw));
  } catch {
    return emptyFeedbackStore();
  }
}

async function writeJsonFile(filePath: string, store: FeedbackStore) {
  const payload = JSON.stringify(store, null, 2);
  await writeFile(filePath, `${payload}\n`, "utf8");
}

export async function readFeedbackStoreFromDisk(): Promise<FeedbackStore> {
  const store = await readJsonFile(dataPath);
  return {
    entries: sortFeedbackEntries(store.entries),
  };
}

export async function addFeedbackEntry(
  input: FeedbackInput
): Promise<{ entry: FeedbackEntry; store: FeedbackStore } | { error: string }> {
  const validated = validateFeedbackInput(input);
  if (!validated.ok) {
    return { error: validated.error };
  }

  const store = await readJsonFile(dataPath);
  const entry = createFeedbackEntry(validated.value);
  const next = appendFeedbackEntry(store, entry);
  next.entries = sortFeedbackEntries(next.entries);

  await writeJsonFile(dataPath, next);
  await writeJsonFile(publicPath, next);

  return { entry, store: next };
}
