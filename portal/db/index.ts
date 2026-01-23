import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Runtime database client — no side effects.
 *
 * NOTE: This module does NOT load dotenv. Environment variables must be
 * provided by the runtime (Vercel, etc.) or loaded by scripts before import:
 *
 *   // In scripts:
 *   import { config } from "dotenv";
 *   config({ path: ".env.local" });
 *   import { db } from "./index";  // Now DATABASE_URL is available
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create postgres client
// max: 1 is intentional — Neon's connection pooler handles multiplexing.
// For non-pooled Postgres, increase this value.
const client = postgres(connectionString, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for convenience
export * from "./schema";