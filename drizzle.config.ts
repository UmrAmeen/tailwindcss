import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './supabase/migrations/schema.ts',      // Path to your Drizzle schema file
  out: './supabase/migrations',       // Folder for migration SQL files
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,   // Must include the correct password
    ssl: { rejectUnauthorized: false } // Required for Supabase
  },
});
