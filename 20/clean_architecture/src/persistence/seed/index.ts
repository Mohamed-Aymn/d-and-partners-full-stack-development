import '../../loadEnv';
import { loadConfig } from '../config';
import { connectMongo } from '../mongodb/connectMongo';
import { createPersistence } from '../createPersistence';
import { toUserRecord, USERS_COLLECTION, type UserSchema } from '../../application/models/user';
import { seedUsers } from './users';

async function seed() {
  const config = loadConfig();
  const client = await connectMongo(config.db.uri);
  const db = client.db(config.db.name);
  const { repository, passwordHasher } = await createPersistence(db, config);

  for (const user of seedUsers) {
    const existing = toUserRecord(
      await repository.findOne(USERS_COLLECTION, { email: user.email })
    );
    if (existing) {
      console.log(`Skipping existing user: ${user.email}`);
      continue;
    }

    const salt = passwordHasher.generateSalt();
    const data: UserSchema = {
      email: user.email,
      password: passwordHasher.hash(user.password, salt),
      salt
    };

    await repository.insert(USERS_COLLECTION, data);
    console.log(`Seeded user: ${user.email}`);
  }

  await client.close();
  console.log('Seed complete');
}

seed().catch((err: unknown) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
