import {
  addHelpRequest,
  isAuthorizedInboxRequest,
  readHelpRequestsFromDisk,
} from "@/app/lib/help-request-file-store";

export async function GET(request: Request) {
  if (!isAuthorizedInboxRequest(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const store = await readHelpRequestsFromDisk();
    return Response.json(store);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      category?: string;
      name?: string;
      email?: string;
      phone?: string;
      town?: string;
      message?: string;
    };
    const result = await addHelpRequest(payload);

    if ("error" in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(
      {
        ok: true,
        id: result.request.id,
        message:
          "Your request was received privately. Someone from the KIOSK will reach out when they can.",
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
