import { NextResponse } from "next/server";
import { getIncidentById } from "../../../../lib/store";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const incident = getIncidentById(params.id);
  if (!incident) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    incidentId: incident.id,
    createdAt: incident.createdAt,
    email: incident.email,
    company: incident.company,
    system: incident.system,
    notes: incident.notes,
    files: incident.files
  });
}
