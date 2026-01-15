"use client";

import { useState } from "react";

type Copy = {
  title: string;
  label: string;
  placeholder: string;
  helper: string;
  success: string;
  submit: string;
  requestDemo: string;
  invalidEmail: string;
  error: string;
};

const WAITLIST_ENDPOINT = "https://example.com/waitlist";

export default function WaitlistForm({ copy }: { copy: Copy }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError(copy.invalidEmail);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, source: "waitlist" })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(copy.error);
    }
  };

  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-soft">
      <h3 className="text-2xl font-semibold text-ink-900">{copy.title}</h3>
      <p className="mt-2 text-sm text-ink-500">{copy.helper}</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-ink-700">
          {copy.label}
          <input
            type="email"
            name="email"
            aria-label={copy.label}
            placeholder={copy.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-base text-ink-900 outline-none transition focus:border-neon-500 focus:ring-2 focus:ring-neon-400"
            required
          />
        </label>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="inline-flex items-center justify-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "success" ? copy.success : copy.submit}
          </button>
          <a
            href="mailto:hello@srebi.com?subject=Srebi%20Demo%20Request"
            className="inline-flex items-center justify-center rounded-full border border-mist-200 px-6 py-3 text-sm font-semibold text-ink-700 transition hover:border-ink-900 hover:text-ink-900"
          >
            {copy.requestDemo}
          </a>
        </div>
        <p className="text-xs text-ink-500">
          Endpoint placeholder: {WAITLIST_ENDPOINT}. Replace with your CRM or
          serverless form handler.
        </p>
      </form>
    </div>
  );
}
