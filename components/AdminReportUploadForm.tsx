"use client";

import { useState } from "react";

type Copy = {
  uploadTitle: string;
  uploadDescription: string;
  uploadLabel: string;
  upload: string;
  uploading: string;
  success: string;
  error: string;
  viewIncident: string;
};

export default function AdminReportUploadForm({
  incidentId,
  locale,
  secret,
  copy
}: {
  incidentId: string;
  locale: string;
  secret: string;
  copy: Copy;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    setStatus("uploading");

    try {
      const form = new FormData();
      form.append("incidentId", incidentId);
      form.append("file", file);

      const res = await fetch("/api/admin/reports/upload", {
        method: "POST",
        headers: {
          "x-admin-secret": secret
        },
        body: form
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-ink-900">{copy.uploadTitle}</h2>
      <p className="mt-2 text-sm text-ink-500">{copy.uploadDescription}</p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-ink-700">
          {copy.uploadLabel}
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="mt-2 w-full text-sm text-ink-700 file:mr-4 file:rounded-full file:border-0 file:bg-mist-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-700 hover:file:bg-mist-200"
          />
        </label>
        <button
          type="submit"
          disabled={!file || status === "uploading"}
          className="inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "uploading" ? copy.uploading : copy.upload}
        </button>
        {status === "success" ? (
          <p className="text-xs font-semibold text-neon-500">{copy.success}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-xs text-red-600" role="alert">
            {copy.error}
          </p>
        ) : null}
      </form>
      <a
        href={`/${locale}/incident/${incidentId}`}
        className="mt-4 inline-flex text-xs font-semibold text-ink-700 hover:text-ink-900"
      >
        {copy.viewIncident}
      </a>
    </div>
  );
}
