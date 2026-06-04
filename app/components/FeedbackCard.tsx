import type { FeedbackEntry } from "@/app/lib/feedback";

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function FeedbackCard({ entry }: { entry: FeedbackEntry }) {
  return (
    <article className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-[var(--earth-brown)]">
          {entry.author || "Anonymous"}
        </p>
        <time
          dateTime={entry.createdAt}
          className="text-sm text-[var(--charcoal)]/70"
        >
          {formatWhen(entry.createdAt)}
        </time>
      </header>
      {entry.page ? (
        <p className="mt-2 text-sm font-medium text-[var(--forest-green)]">
          Re: {entry.page}
        </p>
      ) : null}
      <p className="mt-4 whitespace-pre-wrap leading-7">{entry.message}</p>
    </article>
  );
}
