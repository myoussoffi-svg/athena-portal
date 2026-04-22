import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db } from '@/db';

export const dynamic = 'force-dynamic';

// Lightweight health check for external monitors (UptimeRobot, BetterStack, etc.)
// Verifies the DB is reachable. Returns 200 on success, 503 on failure.
export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[health] db check failed:', err);
    return NextResponse.json(
      { status: 'error', error: err instanceof Error ? err.message : 'unknown' },
      { status: 503 }
    );
  }
}
