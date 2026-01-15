import { NextResponse } from "next/server";
import { getIncidentById, getIncidentReport } from "../../../../lib/store";
import { presignGetObject } from "../../../../lib/r2";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const incidentId = searchParams.get("incidentId");

  if (!incidentId) {
    return NextResponse.json({ error: "Missing incidentId" }, { status: 400 });
  }

  const incident = await getIncidentById(incidentId);
  if (!incident) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }

  const report = await getIncidentReport(incidentId);
  if (!report || report.status !== "ready") {
    return NextResponse.json({ error: "Report not ready" }, { status: 404 });
  }

  const url = await presignGetObject(report.objectKey, 600);
  return NextResponse.json({ url });
}
