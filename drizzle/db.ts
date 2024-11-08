import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.POSTGRES_URL, // Connection string from environment variables
});


export const db = drizzle(client, { schema });
