"use client";

import { useCallback, useEffect, useState } from "react";
import {
  HELP_INBOX_STORAGE_KEY,
  getHelpRequestInboxUrl,
  parseHelpRequestStore,
  type HelpRequestEntry,
} from "@/app/lib/help-request";
import { parseJsonResponse } from "@/app/lib/feedback";
import { HelpRequestCard } from "./HelpRequestCard";

const inputClass =
  "w-full rounded-[var(--radius)] border border-[var(--stone)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--forest-green)]";

export function HelpInbox() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [requests, setRequests] = useState<HelpRequestEntry[]>([]);
  const [status, setStatus] = useState<"locked" | "loading" | "ready" | "error">(
    "locked"
  );
  const [error, setError] = useState<string | null>(null);

  const loadInbox = useCallback(async (accessToken: string) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(getHelpRequestInboxUrl(), {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await parseJsonResponse(response);

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Could not open inbox.";
        throw new Error(
          response.status === 401 ? "Incorrect access code." : message
        );
      }

      const store = parseHelpRequestStore(data);
      setRequests(store.requests);
      setSavedToken(accessToken);
      sessionStorage.setItem(HELP_INBOX_STORAGE_KEY, accessToken);
      setStatus("ready");
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Could not load inbox."
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(HELP_INBOX_STORAGE_KEY);
    if (!stored) {
      return;
    }
    const timer = window.setTimeout(() => {
      void loadInbox(stored);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadInbox]);

  function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadInbox(token.trim());
  }

  function handleSignOut() {
    sessionStorage.removeItem(HELP_INBOX_STORAGE_KEY);
    setSavedToken(null);
    setRequests([]);
    setToken("");
    setStatus("locked");
    setError(null);
  }

  if (status === "locked" || status === "error") {
    return (
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-7 text-[var(--charcoal)]/85">
          Team inbox for private help requests. Enter the access code shared with
          KIOSK organizers.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleUnlock}>
          <div>
            <label htmlFor="inbox-token" className="text-sm font-semibold">
              Access code
            </label>
            <input
              id="inbox-token"
              name="token"
              type="password"
              autoComplete="current-password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className={`${inputClass} mt-2`}
            />
          </div>
          {error ? (
            <p className="text-sm font-medium text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--forest-green)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--forest-green-hover)]"
          >
            Open inbox
          </button>
        </form>
      </div>
    );
  }

  if (status === "loading") {
    return <p className="text-sm text-[var(--charcoal)]/70">Loading requests…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--charcoal)]/75">
          {requests.length} private request{requests.length === 1 ? "" : "s"}
        </p>
        <div className="flex gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => savedToken && void loadInbox(savedToken)}
            className="text-[var(--forest-green)] hover:text-[var(--forest-green-hover)]"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-[var(--earth-brown)] hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {requests.map((request) => (
          <li key={request.id}>
            <HelpRequestCard request={request} />
          </li>
        ))}
      </ul>

      {!requests.length ? (
        <p className="mt-8 rounded-[var(--radius)] border border-dashed border-[var(--stone)] bg-white/60 px-5 py-8 text-center text-sm leading-7 text-[var(--charcoal)]/75">
          No private requests yet.
        </p>
      ) : null}
    </div>
  );
}
