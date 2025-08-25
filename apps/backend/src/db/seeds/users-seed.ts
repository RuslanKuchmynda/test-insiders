import { db } from '@/db/db';
import { hashPassword } from '@/common/bcrypt.funcs';
import { userSchema } from '@/db/schemas';
import { usersIds } from '@/constants/test-ids';

const seedUsersData = [
  {
    id: usersIds.userOne,
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'Admin',
    password: 'Admin1!',
    role: 'user' as const,
  },
  {
    id: usersIds.userTwo,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'John1!',
    role: 'user' as const,
  },
];

export async function seedUsers() {
  const userData = await Promise.all(
    seedUsersData.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    })),
  );

  await db.insert(userSchema).values(userData);

  console.log('Trips seeded!');
}
