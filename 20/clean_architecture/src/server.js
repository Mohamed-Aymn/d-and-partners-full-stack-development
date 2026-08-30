const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { loadConfig } = require('./persistence/config');
const { connectMongo } = require('./persistence/mongodb/connectMongo');
const createMongoUserRepository = require('./persistence/mongodb/userRepository');
const createMongoSessionRepository = require('./persistence/mongodb/sessionRepository');
const createMongoIdValidator = require('./persistence/mongodb/idValidator');
const createSha256PasswordHasher = require('./persistence/passwordHasher');
const createJwtTokenService = require('./persistence/tokenService');

const createUserController = require('./application/controllers/userController');
const createAuthController = require('./application/controllers/authController');
const createApp = require('./presentation/createApp');

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

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
