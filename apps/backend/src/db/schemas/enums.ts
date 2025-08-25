import {pgEnum} from "drizzle-orm/pg-core/columns";

export const rolesEnum = pgEnum("roles", ["user", "owner", "collaborator"]);