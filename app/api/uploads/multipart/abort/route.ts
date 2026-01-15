import { NextResponse } from "next/server";
import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { deleteUploadSession } from "../../../../../lib/store";
import { getBucketName, getR2Client } from "../../../../../lib/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    uploadId: string;
    objectKey: string;
  };

  if (!body.uploadId || !body.objectKey) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const client = getR2Client();
  const bucket = getBucketName();

  await client.send(
    new AbortMultipartUploadCommand({
      Bucket: bucket,
      Key: body.objectKey,
      UploadId: body.uploadId
    })
  );

  await deleteUploadSession(body.uploadId);

  return NextResponse.json({ ok: true });
}
