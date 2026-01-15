import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const CHUNK_SIZE = 10 * 1024 * 1024;
export const MAX_FILE_SIZE = 1024 * 1024 * 1024;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }
  return value;
}

export function getBucketName() {
  return process.env.R2_BUCKET || "srebi-incidents";
}

export function hasR2Config() {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY
  );
}

export function getR2Client() {
  const accountId = requireEnv("R2_ACCOUNT_ID");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

export function sanitizeFilename(fileName: string) {
  const normalized = fileName.replace(/[^a-zA-Z0-9._-]+/g, "_");
  const trimmed = normalized.replace(/^_+|_+$/g, "");
  const safe = trimmed || "file";
  return safe.slice(0, 120);
}

export async function putObjectBytes({
  key,
  bytes,
  contentType
}: {
  key: string;
  bytes: Uint8Array;
  contentType: string;
}) {
  const client = getR2Client();
  const bucket = getBucketName();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType
    })
  );
}

export async function presignGetObject(key: string, expiresIn = 600) {
  const client = getR2Client();
  const bucket = getBucketName();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn });
}

export function buildObjectKey({
  incidentId,
  role,
  fileName
}: {
  incidentId: string;
  role: "video" | "logs";
  fileName: string;
}) {
  const timestamp = Date.now();
  const safeName = sanitizeFilename(fileName);
  return `incidents/${incidentId}/${role}/${timestamp}_${safeName}`;
}
