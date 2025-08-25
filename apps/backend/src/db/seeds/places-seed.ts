import { db } from '@/db/db';
import { placesIds, tripsIds } from '@/constants/test-ids';
import { placeSchema } from '@/db/schemas/place.schema';

const seedPlacesData = [
  {
    id: placesIds.placesOne,
    tripId: tripsIds.tripsOne,
    locationName: 'PlaceOne',
    notes: 'TestOne',
    dayNumber: 1,
  },
  {
    id: placesIds.placesTwo,
    tripId: tripsIds.tripsOne,
    locationName: 'PlaceTwo',
    notes: 'TestTwo',
    dayNumber: 2,
  },
  {
    id: placesIds.placesThree,
    tripId: tripsIds.tripsTwo,
    locationName: 'PlaceOne',
    notes: 'TestOne',
    dayNumber: 1,
  },
  {
    id: placesIds.placeFour,
    tripId: tripsIds.tripsTwo,
    locationName: 'PlaceTwo',
    notes: 'TestTwo',
    dayNumber: 2,
  },
];

export async function seedPlaces() {
  await db.insert(placeSchema).values(seedPlacesData);

  console.log('Places seeded!');
}
