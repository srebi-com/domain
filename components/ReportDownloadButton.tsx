"use client";

import { useState } from "react";

type Copy = {
  download: string;
  error: string;
};

export default function ReportDownloadButton({
  incidentId,
  copy
}: {
  incidentId: string;
  copy: Copy;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/presign?incidentId=${incidentId}`);
      if (!res.ok) {
        throw new Error("Failed");
      }
      const data = (await res.json()) as { url: string };
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (downloadError) {
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copy.download}
      </button>
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
