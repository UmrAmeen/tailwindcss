import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { defineConfig } from 'drizzle-kit';

console.log('DB_URL:', process.env.DB_FILE_NAME);

export default defineConfig({
  out: './drizzle',
  schema: './app/lib/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!, 
  },
});
