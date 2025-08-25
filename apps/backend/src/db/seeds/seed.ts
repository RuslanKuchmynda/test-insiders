import { db } from "@/db/db";

import { seedUsers } from "@/db/seeds/users-seed";
import { sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import {userSchema} from "@/db/schemas";
async function seedData() {
  await clearDatabase();

  await seedUsers();

  console.log("Data seeded successfully!");
}
void seedData();

async function clearDatabase() {
  console.log("Clearing existing data...");

  await clearTable(userSchema);

  console.log("Tables cleared and IDs reset!");
}

async function clearTable(schema: PgTable) {
  await db.execute(sql`TRUNCATE TABLE ${schema} RESTART IDENTITY CASCADE;`);
}
