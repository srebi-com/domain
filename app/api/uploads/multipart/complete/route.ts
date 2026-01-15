import { NextResponse } from "next/server";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import {
  appendFileToIncident,
  deleteUploadSession,
  readUploadSession
} from "../../../../../lib/store";
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

  const session = await readUploadSession(body.uploadId);
  if (!session) {
    return NextResponse.json(
      { error: "Upload session not found" },
      { status: 404 }
    );
  }

  await appendFileToIncident(session.incidentId, {
    role: session.role,
    objectKey: session.objectKey,
    fileName: session.fileName,
    size: session.fileSize,
    contentType: session.contentType,
    uploadedAt: new Date().toISOString()
  });

  await deleteUploadSession(body.uploadId);

  return NextResponse.json({ ok: true });
}
