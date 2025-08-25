import {pgTable} from "drizzle-orm/pg-core/table";
import {rolesEnum} from "@/db/schemas/enums";
import { schemas } from "@/db/schema-constants";
import {text} from "drizzle-orm/pg-core/columns";

export const tripCollaboratorsSchema = pgTable(schemas.tripCollaborator, {
  id: text("id").primaryKey(),
  tripId: text("trip_id").notNull(),
  userId: text("user_id").notNull(),
  role: rolesEnum("role").default("collaborator").notNull(),
});