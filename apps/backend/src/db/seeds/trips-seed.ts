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
    title: "TestTwo",
    description: "TestTwo",
  },
  {
    id: tripsIds.tripsThree,
    ownerId: usersIds.userOne,
    title: "TestThree",
    description: "TestThree",
  },
  {
    id: tripsIds.tripsFour,
    ownerId: usersIds.userTwo,
    title: "TestFour",
    description: "TestFour",
  },
];

export async function seedTrips() {


  await db.insert(tripSchema).values(seedTripsData);

  console.log("Users seeded!");
}
