import { config } from "dotenv";
import * as path from "path";

// Load .env.local for local scripts (tsx/db:seed, etc.)
config({ path: path.join(process.cwd(), ".env.local") });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Connection string from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create postgres client
// For serverless environments (Vercel), use connection pooling
const client = postgres(connectionString, {
  max: 1, // Serverless: limit connections
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for convenience
export * from "./schema";