"use client";

import { useState } from "react";
import MultipartUploader from "./MultipartUploader";

const initialState = {
  email: "",
  company: "",
  system: "",
  notes: ""
};

type Copy = {
  title: string;
  subtitle: string;
  form: {
    title: string;
    description: string;
    email: string;
    company: string;
    system: string;
    notes: string;
    submit: string;
    success: string;
  };
  uploader: {
    title: string;
    description: string;
    videoLabel: string;
    logsLabel: string;
    optional: string;
    chooseFile: string;
    upload: string;
    uploading: string;
    uploaded: string;
    retry: string;
    invalidType: string;
    tooLarge: string;
    genericError: string;
    maxSizeHint: string;
    progress: string;
  };
  status: {
    back: string;
    view: string;
  };
};

export default function IncidentSubmission({
  locale,
  copy
}: {
  locale: string;
  copy: Copy;
}) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [incidentId, setIncidentId] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = (await res.json()) as { incidentId: string };
      setIncidentId(data.incidentId);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm text-ink-500">{copy.subtitle}</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-base font-semibold text-ink-900">
                {copy.form.title}
              </p>
              <p className="text-xs text-ink-500">{copy.form.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-ink-700">
                {copy.form.email}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-neon-500 focus:ring-2 focus:ring-neon-400"
                />
              </label>
              <label className="text-xs font-semibold text-ink-700">
                {copy.form.company}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-neon-500 focus:ring-2 focus:ring-neon-400"
                />
              </label>
              <label className="text-xs font-semibold text-ink-700">
                {copy.form.system}
                <input
                  type="text"
                  name="system"
                  value={form.system}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-neon-500 focus:ring-2 focus:ring-neon-400"
                />
              </label>
            </div>
            <label className="text-xs font-semibold text-ink-700">
              {copy.form.notes}
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-neon-500 focus:ring-2 focus:ring-neon-400"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-ink-700"
                disabled={status === "loading" || status === "success"}
              >
                {copy.form.submit}
              </button>
              {status === "success" ? (
                <p className="text-xs font-semibold text-neon-500">
                  {copy.form.success}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-xs text-red-600" role="alert">
                  {copy.uploader.genericError}
                </p>
              ) : null}
            </div>
          </form>

          {incidentId ? (
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-base font-semibold text-ink-900">
                  {copy.uploader.title}
                </p>
                <p className="text-xs text-ink-500">{copy.uploader.description}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <MultipartUploader
                  incidentId={incidentId}
                  role="video"
                  copy={copy.uploader}
                />
                <MultipartUploader
                  incidentId={incidentId}
                  role="logs"
                  copy={copy.uploader}
                />
              </div>
              <a
                href={`/${locale}/incident/${incidentId}`}
                className="text-xs font-semibold text-ink-700 hover:text-ink-900"
              >
                {copy.status.view}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
