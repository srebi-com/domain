"use client";

import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 1024;

type Copy = {
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

type UploadState = "idle" | "ready" | "uploading" | "success" | "error";

export default function MultipartUploader({
  incidentId,
  role,
  copy
}: {
  incidentId: string;
  role: "video" | "logs";
  copy: Copy;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const label = role === "video" ? copy.videoLabel : copy.logsLabel;
  const accept =
    role === "video"
      ? "video/mp4"
      : ".zip,.json,.log,application/zip,application/json,text/plain";

  const isValidType = (selected: File) => {
    const name = selected.name.toLowerCase();
    if (role === "video") {
      return selected.type === "video/mp4" || name.endsWith(".mp4");
    }
    return (
      name.endsWith(".zip") ||
      name.endsWith(".json") ||
      name.endsWith(".log") ||
      selected.type === "application/zip" ||
      selected.type === "application/json" ||
      selected.type === "text/plain"
    );
  };

  const validateFile = (selected: File) => {
    if (!isValidType(selected)) {
      return copy.invalidType;
    }
    if (selected.size > MAX_FILE_SIZE) {
      return copy.tooLarge;
    }
    return "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] || null;
    setError("");
    setProgress(0);
    if (!selected) {
      setFile(null);
      setStatus("idle");
      return;
    }
    const message = validateFile(selected);
    if (message) {
      setError(message);
      setFile(null);
      setStatus("error");
      return;
    }
    setFile(selected);
    setStatus("ready");
  };

  const backoff = (attempt: number) =>
    new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setError("");
    setStatus("uploading");
    setProgress(0);

    let uploadInfo: { uploadId: string; objectKey: string } | null = null;

    try {
      const initRes = await fetch("/api/uploads/multipart/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId,
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          fileSize: file.size,
          role
        })
      });

      if (!initRes.ok) {
        throw new Error("init failed");
      }

      const initData = (await initRes.json()) as {
        uploadId: string;
        objectKey: string;
        chunkSize: number;
        totalParts: number;
      };
      uploadInfo = { uploadId: initData.uploadId, objectKey: initData.objectKey };

      const parts: { partNumber: number; etag: string }[] = [];
      let uploadedBytes = 0;

      for (let partNumber = 1; partNumber <= initData.totalParts; partNumber += 1) {
        const start = (partNumber - 1) * initData.chunkSize;
        const end = Math.min(start + initData.chunkSize, file.size);
        const chunk = file.slice(start, end);

        const urlRes = await fetch("/api/uploads/multipart/part-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploadId: initData.uploadId,
            objectKey: initData.objectKey,
            partNumber
          })
        });

        if (!urlRes.ok) {
          throw new Error("url failed");
        }

        const { url } = (await urlRes.json()) as { url: string };
        let etag = "";
        let success = false;

        for (let attempt = 0; attempt < 3; attempt += 1) {
          const putRes = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type || "application/octet-stream"
            },
            body: chunk
          });

          if (putRes.ok) {
            etag = putRes.headers.get("etag") || putRes.headers.get("ETag") || "";
            if (!etag) {
              throw new Error("Missing ETag");
            }
            success = true;
            break;
          }
          await backoff(attempt);
        }

        if (!success) {
          throw new Error("part upload failed");
        }

        parts.push({ partNumber, etag });
        uploadedBytes += chunk.size;
        setProgress(Math.round((uploadedBytes / file.size) * 100));
      }

      const completeRes = await fetch("/api/uploads/multipart/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploadId: initData.uploadId,
          objectKey: initData.objectKey,
          parts,
          incidentId,
          role,
          fileName: file.name,
          size: file.size,
          contentType: file.type || "application/octet-stream"
        })
      });

      if (!completeRes.ok) {
        throw new Error("complete failed");
      }

      setStatus("success");
    } catch (uploadError) {
      if (uploadInfo) {
        await fetch("/api/uploads/multipart/abort", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadInfo)
        });
      }
      setStatus("error");
      setError(copy.genericError);
    }
  };

  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">{label}</p>
          <p className="text-xs text-ink-500">{copy.maxSizeHint}</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
          {copy.optional}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          aria-label={label}
          className="text-sm text-ink-700 file:mr-4 file:rounded-full file:border-0 file:bg-mist-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-700 hover:file:bg-mist-200"
        />
        {file ? (
          <p className="text-xs text-ink-500">{file.name}</p>
        ) : (
          <p className="text-xs text-ink-500">{copy.chooseFile}</p>
        )}
        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {status === "uploading" ? (
          <p className="text-xs text-ink-500">
            {copy.progress}: {progress}%
          </p>
        ) : null}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || status === "uploading" || status === "success"}
            className="inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "uploading"
              ? copy.uploading
              : status === "success"
                ? copy.uploaded
                : copy.upload}
          </button>
          {status === "error" ? (
            <button
              type="button"
              onClick={handleUpload}
              className="text-xs font-semibold text-ink-700 hover:text-ink-900"
            >
              {copy.retry}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
