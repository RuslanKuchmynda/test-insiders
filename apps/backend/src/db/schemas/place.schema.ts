import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { schemas } from "@/db/schema-constants";

export const placeSchema = pgTable(schemas.place, {
  id: text("id").primaryKey(),
  tripId: text("trip_id").notNull(),
  locationName: varchar("location_name", { length: 255 }).notNull(),
  notes: text("notes"),
  dayNumber: integer("day_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});