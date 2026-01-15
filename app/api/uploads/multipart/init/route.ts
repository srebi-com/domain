import { NextResponse } from "next/server";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getIncidentById, registerUploadSession } from "../../../../../lib/store";
import {
  buildObjectKey,
  CHUNK_SIZE,
  getBucketName,
  getR2Client,
  MAX_FILE_SIZE
} from "../../../../../lib/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    incidentId: string;
    fileName: string;
    contentType: string;
    fileSize: number;
    role: "video" | "logs";
  };

  if (!body.incidentId || !body.fileName || !body.role) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.role !== "video" && body.role !== "logs") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  if (typeof body.fileSize !== "number" || body.fileSize <= 0) {
    return NextResponse.json({ error: "Invalid file size" }, { status: 400 });
  }

  if (!getIncidentById(body.incidentId)) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }

  if (body.fileSize > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const objectKey = buildObjectKey({
    incidentId: body.incidentId,
    role: body.role,
    fileName: body.fileName
  });

  const client = getR2Client();
  const bucket = getBucketName();

  const command = new CreateMultipartUploadCommand({
    Bucket: bucket,
    Key: objectKey,
    ContentType: body.contentType,
    Metadata: {
      incidentId: body.incidentId,
      role: body.role
    }
  });

  const response = await client.send(command);

  if (!response.UploadId) {
    return NextResponse.json({ error: "Upload initialization failed" }, { status: 500 });
  }

  registerUploadSession({
    uploadId: response.UploadId,
    objectKey,
    incidentId: body.incidentId,
    role: body.role,
    fileName: body.fileName,
    size: body.fileSize,
    contentType: body.contentType
  });

  return NextResponse.json({
    uploadId: response.UploadId,
    objectKey,
    chunkSize: CHUNK_SIZE,
    totalParts: Math.ceil(body.fileSize / CHUNK_SIZE)
  });
}
