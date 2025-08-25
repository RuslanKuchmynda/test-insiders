import { db } from '@/db/db';

import { seedUsers } from '@/db/seeds/users-seed';
import { sql } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { userSchema } from '@/db/schemas';
import { seedTrips } from '@/db/seeds/trips-seed';
import { tripSchema } from '@/db/schemas/trip.schema';
import { seedPlaces } from '@/db/seeds/places-seed';
import { placeSchema } from '@/db/schemas/place.schema';
import { seedTripCollaborators } from '@/db/seeds/trip-collaborator.seed';
import { tripCollaboratorsSchema } from '@/db/schemas/trip-collaborator.schema';
async function seedData() {
  await clearDatabase();

  await seedUsers();
  await seedTrips();
  await seedPlaces();
  await seedTripCollaborators();

  console.log('Data seeded successfully!');
}
void seedData();

async function clearDatabase() {
  console.log('Clearing existing data...');

  await clearTable(userSchema);
  await clearTable(tripSchema);
  await clearTable(placeSchema);
  await clearTable(tripCollaboratorsSchema);

  console.log('Tables cleared and IDs reset!');
}

async function clearTable(schema: PgTable) {
  await db.execute(sql`TRUNCATE TABLE ${schema} RESTART IDENTITY CASCADE;`);
}
