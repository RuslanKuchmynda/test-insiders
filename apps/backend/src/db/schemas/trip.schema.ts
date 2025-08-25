import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { schemas } from '@/db/schema-constants';

export const tripSchema = pgTable(schemas.trip, {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
