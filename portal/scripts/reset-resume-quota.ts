import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '..', '.env.local') });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { resumeFeedback } from '../db/schema';

async function main() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  const deleted = await db.delete(resumeFeedback).returning();
  console.log(`Deleted ${deleted.length} records. Your quota is now 0/10`);

  await client.end();
}

main().catch(console.error);
