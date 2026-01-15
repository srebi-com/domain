import crypto from "crypto";
import {
  deleteObject,
  getObjectText,
  hasR2Config,
  putObjectBytes
} from "./r2";

export type IncidentInput = {
  email?: string;
  company?: string;
  system?: string;
  notes?: string;
};

export type IncidentFile = {
  role: "video" | "logs";
  objectKey: string;
  fileName: string;
  size: number;
  contentType: string;
  uploadedAt: string;
};

export type IncidentReport = {
  status: "ready" | "none" | "processing";
  objectKey?: string;
  fileName?: string;
  size?: number;
  contentType?: "application/pdf";
  uploadedAt?: string;
};

export type IncidentRecord = IncidentInput & {
  id: string;
  createdAt: string;
  files: IncidentFile[];
  report?: IncidentReport;
};

type UploadSession = {
  incidentId: string;
  objectKey: string;
  role: "video" | "logs";
  fileName: string;
  fileSize: number;
  contentType: string;
  createdAt: string;
};

function incidentMetaKey(incidentId: string) {
  return `incidents/${incidentId}/meta.json`;
}

function uploadSessionKey(uploadId: string) {
  return `uploads/${uploadId}.json`;
}

async function readJson<T>(key: string): Promise<T | null> {
  if (!hasR2Config()) {
    return null;
  }
  try {
    const text = await getObjectText(key);
    if (!text) {
      return null;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    return null;
  }
}

async function writeJson(key: string, data: object) {
  const payload = Buffer.from(JSON.stringify(data, null, 2));
  await putObjectBytes({
    key,
    bytes: payload,
    contentType: "application/json"
  });
}

function buildMeta({
  id,
  createdAt,
  input
}: {
  id: string;
  createdAt: string;
  input?: IncidentInput;
}): IncidentRecord {
  return {
    id,
    createdAt,
    email: input?.email,
    company: input?.company,
    system: input?.system,
    notes: input?.notes,
    files: [],
    report: { status: "none" }
  };
}

export async function createIncident(input: IncidentInput) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const record = buildMeta({ id, createdAt, input });
  await writeJson(incidentMetaKey(id), record);
  return record;
}

export async function ensureIncidentMeta(incidentId: string) {
  const existing = await getIncidentById(incidentId);
  if (existing) {
    return existing;
  }
  const createdAt = new Date().toISOString();
  const record = buildMeta({ id: incidentId, createdAt });
  await writeJson(incidentMetaKey(incidentId), record);
  return record;
}

export async function getIncidentById(id: string) {
  const meta = await readJson<IncidentRecord>(incidentMetaKey(id));
  return meta || null;
}

export async function appendFileToIncident(
  incidentId: string,
  file: IncidentFile
) {
  const meta = (await getIncidentById(incidentId)) ||
    (await ensureIncidentMeta(incidentId));
  const exists = meta.files.some((item) => item.objectKey === file.objectKey);
  if (!exists) {
    meta.files.push(file);
    await writeJson(incidentMetaKey(incidentId), meta);
  }
  return meta;
}

export async function getIncidentReport(incidentId: string) {
  const meta = await getIncidentById(incidentId);
  return meta?.report || null;
}

export async function setIncidentReport(
  incidentId: string,
  report: IncidentReport
) {
  const meta = (await getIncidentById(incidentId)) ||
    (await ensureIncidentMeta(incidentId));
  meta.report = report;
  await writeJson(incidentMetaKey(incidentId), meta);
}

export async function writeUploadSession(uploadId: string, session: UploadSession) {
  await writeJson(uploadSessionKey(uploadId), session);
}

export async function readUploadSession(uploadId: string) {
  return readJson<UploadSession>(uploadSessionKey(uploadId));
}

export async function deleteUploadSession(uploadId: string) {
  await deleteObject(uploadSessionKey(uploadId));
}
