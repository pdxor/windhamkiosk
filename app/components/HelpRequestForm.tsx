"use client";

import { useState } from "react";
import {
  HELP_CATEGORY_LABELS,
  getHelpRequestPostUrl,
  type HelpRequestCategory,
} from "@/app/lib/help-request";
import { parseJsonResponse } from "@/app/lib/feedback";

const inputClass =
  "w-full rounded-[var(--radius)] border border-[var(--stone)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--forest-green)]";

const categories = Object.keys(HELP_CATEGORY_LABELS) as HelpRequestCategory[];

export function HelpRequestForm() {
  const [category, setCategory] = useState<HelpRequestCategory>("resident");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setStatus("submitting");

    try {
      const response = await fetch(getHelpRequestPostUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name, email, phone, town, message }),
      });
      const data = (await parseJsonResponse(response)) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setError(
          typeof data.error === "string" ? data.error : "Could not send your request."
        );
        setStatus("idle");
        return;
      }

      setName("");
      setEmail("");
      setPhone("");
      setTown("");
      setMessage("");
      setSuccess(
        data.message ??
          "Your request was received privately. Someone from the KIOSK will reach out when they can."
      );
      setStatus("idle");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send your request. Check your connection and try again."
      );
      setStatus("idle");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="rounded-[var(--radius)] border border-[var(--mist-blue)]/40 bg-white/80 px-4 py-3 text-sm leading-7 text-[var(--charcoal)]">
        <strong className="text-[var(--earth-brown)]">Private.</strong> Only the
        KIOSK team can read what you submit here. It is not posted on the website.
      </p>

      <div>
        <label htmlFor="help-category" className="text-sm font-semibold">
          I am reaching out as
        </label>
        <select
          id="help-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as HelpRequestCategory)}
          className={`${inputClass} mt-2`}
        >
          {categories.map((key) => (
            <option key={key} value={key}>
              {HELP_CATEGORY_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="help-name" className="text-sm font-semibold">
          Your name
        </label>
        <input
          id="help-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputClass} mt-2`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="help-phone" className="text-sm font-semibold">
            Phone
          </label>
          <input
            id="help-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputClass} mt-2`}
            placeholder="Optional if email provided"
          />
        </div>
        <div>
          <label htmlFor="help-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="help-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputClass} mt-2`}
            placeholder="Optional if phone provided"
          />
        </div>
      </div>

      <div>
        <label htmlFor="help-town" className="text-sm font-semibold">
          Town <span className="font-normal text-[var(--charcoal)]/60">(optional)</span>
        </label>
        <input
          id="help-town"
          name="town"
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          className={`${inputClass} mt-2`}
          placeholder="Windham, Ashland, Jewett…"
        />
      </div>

      <div>
        <label htmlFor="help-message" className="text-sm font-semibold">
          How can we help?
        </label>
        <textarea
          id="help-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} mt-2 resize-y`}
          placeholder="Transportation, companionship, a difficult moment, volunteer interest, business partnership…"
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
        {status === "submitting" ? "Sending privately…" : "Send private request"}
      </button>
    </form>
  );
}
