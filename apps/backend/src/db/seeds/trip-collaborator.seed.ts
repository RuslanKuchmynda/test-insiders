import { db } from '@/db/db';
import { tripCollaboratorsIds, tripsIds, usersIds } from '@/constants/test-ids';
import { tripCollaboratorsSchema } from '@/db/schemas/trip-collaborator.schema';

const seedTripCollaboratorsData = [
  {
    id: tripCollaboratorsIds.collaboratorOne,
    tripId: tripsIds.tripsOne,
    userId: usersIds.userTwo,
    role: 'collaborator' as const,
  },
  {
    id: tripCollaboratorsIds.collaboratorTwo,
    tripId: tripsIds.tripsTwo,
    userId: usersIds.userOne,
    role: 'collaborator' as const,
  },
];

export async function seedTripCollaborators() {
  await db.insert(tripCollaboratorsSchema).values(seedTripCollaboratorsData);

  console.log('Collaborators seeded!');
}
