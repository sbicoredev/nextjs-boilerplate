import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { serverEnv } from "~/env/server";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Pool | undefined;
};

export const client =
  globalForDb.client ?? new Pool({ connectionString: serverEnv.DB_URL });

if (serverEnv.NODE_ENV !== "production") {
  globalForDb.client = client;
}

export const db = drizzle({ client, schema });

export const table = schema;
