import fs from "fs";
import path from "path";
import crypto from "crypto";

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

export type IncidentRecord = IncidentInput & {
  id: string;
  createdAt: string;
  files: IncidentFile[];
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

export function getIncidentById(id: string) {
  loadFromDisk();
  return incidents.get(id) || null;
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
