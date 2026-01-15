import { NextResponse } from "next/server";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { addFileToIncident, consumeUploadSession } from "../../../../../lib/store";
import { getBucketName, getR2Client } from "../../../../../lib/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    uploadId: string;
    objectKey: string;
    parts: { partNumber: number; etag: string }[];
    incidentId?: string;
    fileName?: string;
    size?: number;
    contentType?: string;
    role?: "video" | "logs";
  };

  if (!body.uploadId || !body.objectKey || !body.parts?.length) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.parts.some((part) => !part.partNumber || !part.etag)) {
    return NextResponse.json({ error: "Invalid parts" }, { status: 400 });
  }

  const client = getR2Client();
  const bucket = getBucketName();

  const command = new CompleteMultipartUploadCommand({
    Bucket: bucket,
    Key: body.objectKey,
    UploadId: body.uploadId,
    MultipartUpload: {
      Parts: body.parts.map((part) => ({
        PartNumber: part.partNumber,
        ETag: part.etag
      }))
    }
  });

  await client.send(command);

  const stored = consumeUploadSession(body.uploadId, body.objectKey);
  const payload = stored || {
    uploadId: body.uploadId,
    objectKey: body.objectKey,
    incidentId: body.incidentId || "",
    role: body.role || "video",
    fileName: body.fileName || "file",
    size: body.size || 0,
    contentType: body.contentType || "application/octet-stream"
  };

  if (payload.incidentId) {
    addFileToIncident(payload.incidentId, {
      role: payload.role,
      objectKey: payload.objectKey,
      fileName: payload.fileName,
      size: payload.size,
      contentType: payload.contentType,
      uploadedAt: new Date().toISOString()
    });
  }

  return NextResponse.json({ ok: true });
}
