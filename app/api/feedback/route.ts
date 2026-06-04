import {
  addFeedbackEntry,
  readFeedbackStoreFromDisk,
} from "@/app/lib/feedback-file-store";

export async function GET() {
  try {
    const store = await readFeedbackStoreFromDisk();
    return Response.json(store);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      author?: string;
      message?: string;
      page?: string;
    };
    const result = await addFeedbackEntry(payload);

    if ("error" in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(
      { entry: result.entry, entries: result.store.entries },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
