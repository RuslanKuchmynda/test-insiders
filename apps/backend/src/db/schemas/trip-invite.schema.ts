import { pgTable, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core/columns';
import { schemas } from '@/db/schema-constants';

export const tripInvitesSchema = pgTable(schemas.tripInvite, {
  id: text('id').primaryKey(),
  tripId: text('trip_id').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  accepted: timestamp('accepted'),
  canceled: boolean('canceled'),
});
