import './loadEnv';
import { loadConfig } from './persistence/config';
import { getMongoDb } from './persistence/mongodb/connectMongo';
import { createPersistence } from './persistence/createPersistence';
import { createUserControllers } from './application/controllers/userControllers';
import { createAuthControllers } from './application/controllers/authControllers';
import { createApp } from './presentation/createApp';
import { ensureSessionIndexes } from './application/models/session';

async function start() {
  const config = loadConfig();
  const db = await getMongoDb(config.db.uri, config.db.name);
  const persistence = await createPersistence(db, config);
  await ensureSessionIndexes(persistence.repository);

  const userController = createUserControllers(persistence);
  const authController = createAuthControllers(persistence);

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
