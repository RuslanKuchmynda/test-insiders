import { config } from 'dotenv';
config();

export default {
  schema: './src/db/schemas',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} as const;
