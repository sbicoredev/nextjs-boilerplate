import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "~/server/db/client";

/**
 * Liveness/readiness probe for the Docker HEALTHCHECK (see Dockerfile) and
 * any external uptime monitor.
 *
 * Deliberately checks only the database — the one dependency every request
 * needs regardless of route. Rate-limit backend (Upstash/Redis) is NOT
 * checked here: it fails closed on its own (see
 * src/server/rate-limit/check.ts) and an outage there shouldn't take the
 * whole container out of rotation.
 *
 * No auth, no rate limiting on this route by design — it needs to stay
 * reachable during startup and from container-internal healthchecks that
 * don't send cookies.
 */
export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json(
      { status: "ok", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch {
    // Deliberately no error detail in the response body — this endpoint is
    // reachable pre-auth, so it shouldn't leak connection strings or stack
    // traces. Full detail already goes to reportError's structured logs
    // via the caller's own error boundary if this throws further upstream.
    return NextResponse.json(
      { status: "error", timestamp: new Date().toISOString() },
      { status: 503 }
    );
  }
}
