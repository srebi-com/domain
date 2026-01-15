import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Readable } from "stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getBucketName, getR2Client, hasR2Config, putObjectBytes } from "./r2";

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
  objectKey: string;
  fileName: string;
  size: number;
  contentType: "application/pdf";
  uploadedAt: string;
};

export type IncidentRecord = IncidentInput & {
  id: string;
  createdAt: string;
  files: IncidentFile[];
  report?: IncidentReport;
};

type UploadSession = {
  uploadId: string;
  objectKey: string;
  incidentId: string;
  role: "video" | "logs";
  fileName: string;
  size: number;
  contentType: string;
};

const incidents = new Map<string, IncidentRecord>();
const uploads = new Map<string, UploadSession>();
let loaded = false;

const storePath =
  process.env.INCIDENT_STORE_PATH ||
  path.join(process.cwd(), "data", "incidents.json");

function loadFromDisk() {
  if (loaded) {
    return;
  }
  loaded = true;
  try {
    if (!fs.existsSync(storePath)) {
      return;
    }
    const raw = fs.readFileSync(storePath, "utf8");
    const parsed = JSON.parse(raw) as IncidentRecord[];
    parsed.forEach((incident) => {
      incidents.set(incident.id, incident);
    });
  } catch (error) {
    // Fall back to in-memory only if disk read fails.
  }
}

function saveToDisk() {
  try {
    const dir = path.dirname(storePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      storePath,
      JSON.stringify(Array.from(incidents.values()), null, 2),
      "utf8"
    );
  } catch (error) {
    // Ignore disk write failures for MVP in-memory mode.
  }
}

export function createIncident(input: IncidentInput) {
  loadFromDisk();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const record: IncidentRecord = {
    id,
    createdAt,
    files: [],
    ...input
  };
  incidents.set(id, record);
  saveToDisk();
  return record;
}

async function readIncidentMeta(incidentId: string) {
  if (!hasR2Config()) {
    return null;
  }
  const client = getR2Client();
  const bucket = getBucketName();
  const key = `incidents/${incidentId}/meta.json`;
  try {
    const response = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    if (!response.Body) {
      return null;
    }
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const text = Buffer.concat(chunks).toString("utf8");
    return JSON.parse(text) as { report?: IncidentReport };
  } catch (error) {
    return null;
  }
}

async function writeIncidentMeta(incidentId: string, data: object) {
  const key = `incidents/${incidentId}/meta.json`;
  const payload = Buffer.from(JSON.stringify(data, null, 2));
  await putObjectBytes({
    key,
    bytes: payload,
    contentType: "application/json"
  });
}

export async function getIncidentById(id: string) {
  loadFromDisk();
  const incident = incidents.get(id) || null;
  if (!incident) {
    return null;
  }
  const meta = await readIncidentMeta(id);
  if (meta?.report) {
    return { ...incident, report: meta.report };
  }
  return incident;
}

export function addFileToIncident(incidentId: string, file: IncidentFile) {
  loadFromDisk();
  const incident = incidents.get(incidentId);
  if (!incident) {
    return null;
  }
  incident.files.push(file);
  incidents.set(incidentId, incident);
  saveToDisk();
  return incident;
}

export async function getIncidentReport(incidentId: string) {
  const meta = await readIncidentMeta(incidentId);
  return meta?.report || null;
}

export async function setIncidentReport(
  incidentId: string,
  report: IncidentReport
) {
  loadFromDisk();
  const incident = incidents.get(incidentId);
  const meta = (await readIncidentMeta(incidentId)) || {};
  const nextMeta = {
    incidentId,
    createdAt: incident?.createdAt || new Date().toISOString(),
    email: incident?.email,
    company: incident?.company,
    system: incident?.system,
    notes: incident?.notes,
    files: incident?.files || [],
    ...meta,
    report
  };
  await writeIncidentMeta(incidentId, nextMeta);
  if (incident) {
    incident.report = report;
    incidents.set(incidentId, incident);
    saveToDisk();
  }
}

export function registerUploadSession(session: UploadSession) {
  uploads.set(`${session.uploadId}:${session.objectKey}`, session);
}

export function consumeUploadSession(uploadId: string, objectKey: string) {
  const key = `${uploadId}:${objectKey}`;
  const session = uploads.get(key) || null;
  if (session) {
    uploads.delete(key);
  }
  return session;
}

export function getUploadSession(uploadId: string, objectKey: string) {
  return uploads.get(`${uploadId}:${objectKey}`) || null;
}
