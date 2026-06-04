"use client";

import { useCallback, useState } from "react";
import {
  getFeedbackApiUrl,
  parseFeedbackStore,
  type FeedbackEntry,
} from "@/app/lib/feedback";
import { FeedbackCard } from "./FeedbackCard";

const inputClass =
  "w-full rounded-[var(--radius)] border border-[var(--stone)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--forest-green)]";

type FeedbackBoardProps = {
  initialEntries: FeedbackEntry[];
};

export function FeedbackBoard({ initialEntries }: FeedbackBoardProps) {
  const [entries, setEntries] = useState<FeedbackEntry[]>(initialEntries);
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "submitting">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadEntries = useCallback(async () => {
    setStatus("loading");
    setError(null);

    const apiUrl = getFeedbackApiUrl();
    const sources = [apiUrl, "/feedback.json"];

    for (const url of sources) {
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) continue;
        const data = await response.json();
        const store = parseFeedbackStore(data);
        setEntries(store.entries);
        setStatus("idle");
        return;
      } catch {
        // try next source
      }
    }

    setError("Could not load feedback right now. Please refresh and try again.");
    setStatus("idle");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setStatus("submitting");

    try {
      const response = await fetch(getFeedbackApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, page, message }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save.");
        setStatus("idle");
        return;
      }

      if (Array.isArray(data.entries)) {
        setEntries(parseFeedbackStore({ entries: data.entries }).entries);
      } else if (data.entry) {
        setEntries((prev) =>
          parseFeedbackStore({ entries: [data.entry, ...prev] }).entries
        );
      } else {
        await loadEntries();
      }
      setMessage("");
      setSuccess("Thank you — your note is on the board for the team and agent.");
      setStatus("idle");
    } catch {
      setError("Could not save feedback. Check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <section aria-labelledby="feedback-form-heading">
        <h2
          id="feedback-form-heading"
          className="brand-heading text-2xl font-bold text-[var(--earth-brown)]"
        >
          Share a note
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--charcoal)]/85">
          Tell us what to change on the site — wording, photos, sections, or
          anything that feels off. It appears on this page right away.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="feedback-author" className="text-sm font-semibold">
              Your name <span className="font-normal text-[var(--charcoal)]/60">(optional)</span>
            </label>
            <input
              id="feedback-author"
              name="author"
              type="text"
              autoComplete="name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="Milly"
            />
          </div>

          <div>
            <label htmlFor="feedback-page" className="text-sm font-semibold">
              Page or section <span className="font-normal text-[var(--charcoal)]/60">(optional)</span>
            </label>
            <input
              id="feedback-page"
              name="page"
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="Hero, About, footer, etc."
            />
          </div>

          <div>
            <label htmlFor="feedback-message" className="text-sm font-semibold">
              Feedback
            </label>
            <textarea
              id="feedback-message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} mt-2 resize-y`}
              placeholder="What should we update?"
            />
          </div>

          {error ? (
            <p className="text-sm font-medium text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="text-sm font-medium text-[var(--forest-green)]" role="status">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-[var(--forest-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(78,123,106,0.22)] transition hover:bg-[var(--forest-green-hover)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Publishing…" : "Publish to board"}
          </button>
        </form>
      </section>

      <section aria-labelledby="feedback-board-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="feedback-board-heading"
            className="brand-heading text-2xl font-bold text-[var(--earth-brown)]"
          >
            Published notes
          </h2>
          <button
            type="button"
            onClick={() => void loadEntries()}
            disabled={status === "loading"}
            className="text-sm font-semibold text-[var(--forest-green)] transition hover:text-[var(--forest-green-hover)] disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
        <p className="mt-2 text-sm text-[var(--charcoal)]/75">
          Agents can also read{" "}
          <a
            href="/feedback.json"
            className="font-semibold text-[var(--forest-green)] underline-offset-2 hover:underline"
          >
            /feedback.json
          </a>{" "}
          for machine-friendly updates.
        </p>

        {status === "loading" && entries.length === 0 ? (
          <p className="mt-8 text-sm text-[var(--charcoal)]/70">Loading notes…</p>
        ) : null}

        <ul className="mt-6 space-y-4">
          {entries.map((entry) => (
            <li key={entry.id}>
              <FeedbackCard entry={entry} />
            </li>
          ))}
        </ul>

        {!entries.length && status !== "loading" ? (
          <p className="mt-8 rounded-[var(--radius)] border border-dashed border-[var(--stone)] bg-white/60 px-5 py-8 text-center text-sm leading-7 text-[var(--charcoal)]/75">
            No notes yet. Be the first to leave feedback for the site build.
          </p>
        ) : null}
      </section>
    </div>
  );
}
