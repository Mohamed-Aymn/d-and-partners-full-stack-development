import './loadEnv';
import { loadConfig } from './persistence/config';
import { connectMongo } from './persistence/mongodb/connectMongo';
import { createMongoUserRepository } from './persistence/mongodb/userRepository';
import { createMongoSessionRepository } from './persistence/mongodb/sessionRepository';
import { createMongoIdValidator } from './persistence/mongodb/idValidator';
import { createSha256PasswordHasher } from './persistence/passwordHasher';
import { createJwtTokenService } from './persistence/tokenService';
import { createUserController } from './application/controllers/userController';
import { createAuthController } from './application/controllers/authController';
import { createApp } from './presentation/createApp';

async function start() {
  const config = loadConfig();
  const client = await connectMongo(config.db.uri);
  const db = client.db(config.db.name);

  const usersCollection = db.collection('users');
  const sessionsCollection = db.collection('sessions');

  await sessionsCollection.createIndex({ token: 1 });
  await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  const userRepository = createMongoUserRepository(usersCollection);
  const sessionRepository = createMongoSessionRepository(sessionsCollection);
  const passwordHasher = createSha256PasswordHasher(config.passwordPepper);
  const tokenService = createJwtTokenService(config.jwtSecret);
  const idValidator = createMongoIdValidator();

  const userController = createUserController({
    userRepository,
    sessionRepository,
    passwordHasher
  });
  const authController = createAuthController({
    userRepository,
    sessionRepository,
    passwordHasher,
    tokenService
  });

  const app = createApp({
    userController,
    authController,
    authorizeUser: {
      sessionRepository,
      tokenService,
      idValidator
    }
  });

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
}

start().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
