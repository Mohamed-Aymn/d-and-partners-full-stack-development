import './loadEnv';
import { loadConfig } from './persistence/config';
import { connectMongo } from './persistence/mongodb/connectMongo';
import { createPersistence } from './persistence/createPersistence';
import { createUserController } from './application/controllers/userController';
import { createAuthController } from './application/controllers/authController';
import { createApp } from './presentation/createApp';
import { ensureSessionIndexes } from './application/models/session';

async function start() {
  const config = loadConfig();
  const client = await connectMongo(config.db.uri);
  const db = client.db(config.db.name);
  const persistence = await createPersistence(db, config);
  await ensureSessionIndexes(persistence.repository);

  const userController = createUserController(persistence);
  const authController = createAuthController(persistence);

  const app = createApp({
    userController,
    authController,
    authorizeUser: persistence
  });

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
}

start().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
