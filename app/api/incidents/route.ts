import { NextResponse } from "next/server";
import { createIncident } from "../../../lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    company?: string;
    system?: string;
    notes?: string;
  };

  const incident = createIncident({
    email: body.email?.trim() || undefined,
    company: body.company?.trim() || undefined,
    system: body.system?.trim() || undefined,
    notes: body.notes?.trim() || undefined
  });

  return NextResponse.json({
    incidentId: incident.id,
    createdAt: incident.createdAt
  });
}
