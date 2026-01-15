import { NextResponse } from "next/server";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getBucketName, getR2Client } from "../../../../../lib/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    uploadId: string;
    objectKey: string;
    partNumber: number;
  };

  if (!body.uploadId || !body.objectKey || !body.partNumber) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (body.partNumber < 1) {
    return NextResponse.json({ error: "Invalid part number" }, { status: 400 });
  }

  const client = getR2Client();
  const bucket = getBucketName();

  const command = new UploadPartCommand({
    Bucket: bucket,
    Key: body.objectKey,
    UploadId: body.uploadId,
    PartNumber: body.partNumber
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 * 10 });

  return NextResponse.json({ url });
}
