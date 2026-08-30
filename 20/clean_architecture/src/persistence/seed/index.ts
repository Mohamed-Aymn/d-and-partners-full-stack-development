import '../../loadEnv';
import { loadConfig } from '../config';
import { connectMongo } from '../mongodb/connectMongo';
import { createSha256PasswordHasher } from '../passwordHasher';
import { seedUsers } from './users';

async function seed() {
  const config = loadConfig();
  const client = await connectMongo(config.db.uri);
  const db = client.db(config.db.name);
  const usersCollection = db.collection('users');
  const passwordHasher = createSha256PasswordHasher(config.passwordPepper);

  for (const user of seedUsers) {
    const existing = await usersCollection.findOne({ email: user.email });
    if (existing) {
      console.log(`Skipping existing user: ${user.email}`);
      continue;
    }

    const salt = passwordHasher.generateSalt();
    const passwordHash = passwordHasher.hash(user.password, salt);

    await usersCollection.insertOne({
      email: user.email,
      password: passwordHash,
      salt
    });

    console.log(`Seeded user: ${user.email}`);
  }

  await client.close();
  console.log('Seed complete');
}

seed().catch((err: unknown) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
