import { text } from "drizzle-orm/pg-core/columns";
import { pgTable } from "drizzle-orm/pg-core/table";
import { schemas } from "@/db/schema-constants";
import {rolesEnum} from "@/db/schemas/enums";
import {boolean, timestamp} from "drizzle-orm/pg-core";



export const userSchema = pgTable(schemas.user, {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  password: text("password").notNull(),
  role: rolesEnum("role").default("user").notNull(),

  isEmailVerified: boolean("isEmailVerified").default(false),
  emailVerifyToken: text("emailVerifyToken"),
  emailVerifyTokenExpiresAt: timestamp("emailVerifyTokenExpiresAt"),

  passwordResetToken: text("passwordResetToken"),
  passwordResetExpires: timestamp("passwordResetExpires"),
});
