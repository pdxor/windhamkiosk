import {
  HELP_CATEGORY_LABELS,
  type HelpRequestEntry,
} from "@/app/lib/help-request";

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function HelpRequestCard({ request }: { request: HelpRequestEntry }) {
  return (
    <article className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-[var(--earth-brown)]">{request.name}</p>
        <time
          dateTime={request.createdAt}
          className="text-sm text-[var(--charcoal)]/70"
        >
          {formatWhen(request.createdAt)}
        </time>
      </header>
      <p className="mt-2 text-sm font-medium text-[var(--forest-green)]">
        {HELP_CATEGORY_LABELS[request.category]}
      </p>
      {(request.phone || request.email || request.town) && (
        <ul className="mt-3 space-y-1 text-sm text-[var(--charcoal)]/85">
          {request.phone ? (
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a href={`tel:${request.phone}`} className="underline-offset-2 hover:underline">
                {request.phone}
              </a>
            </li>
          ) : null}
          {request.email ? (
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${request.email}`}
                className="underline-offset-2 hover:underline"
              >
                {request.email}
              </a>
            </li>
          ) : null}
          {request.town ? (
            <li>
              <span className="font-semibold">Town:</span> {request.town}
            </li>
          ) : null}
        </ul>
      )}
      <p className="mt-4 whitespace-pre-wrap leading-7">{request.message}</p>
    </article>
  );
}
