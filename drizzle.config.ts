import "dotenv";
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
})