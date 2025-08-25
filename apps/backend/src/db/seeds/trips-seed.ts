import { db } from "@/db/db";
import {tripsIds, usersIds} from "@/constants/test-ids";
import {tripSchema} from "@/db/schemas/trip.schema";

const seedTripsData = [
  {
    id: tripsIds.tripsOne,
    ownerId: usersIds.userOne,
    title: "TestOne",
    description: "TestOne",
  },
  {
    id: tripsIds.tripsTwo,
    ownerId: usersIds.userTwo,
    title: "TestOne",
    description: "TestOne",
  },
];

export async function seedTrips() {


  await db.insert(tripSchema).values(seedTripsData);

  console.log("Users seeded!");
}
