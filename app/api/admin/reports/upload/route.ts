import { NextResponse } from "next/server";
import { setIncidentReport, getIncidentById } from "../../../../../lib/store";
import { putObjectBytes } from "../../../../../lib/r2";

export const runtime = "nodejs";

const MAX_REPORT_SIZE = 25 * 1024 * 1024;

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const incidentId = form.get("incidentId")?.toString();
  const file = form.get("file") as File | null;

  if (!incidentId || !file) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const incident = await getIncidentById(incidentId);
  if (!incident) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_REPORT_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const objectKey = `incidents/${incidentId}/report/report.pdf`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  await putObjectBytes({
    key: objectKey,
    bytes,
    contentType: "application/pdf"
  });

  await setIncidentReport(incidentId, {
    status: "ready",
    objectKey,
    fileName: file.name || "report.pdf",
    size: file.size,
    contentType: "application/pdf",
    uploadedAt: new Date().toISOString()
  });

  return NextResponse.json({ ok: true });
}
