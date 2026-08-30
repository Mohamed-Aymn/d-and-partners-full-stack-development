import type { Db } from 'mongodb';
import type { Config } from './config';
import { createMongoUserRepository } from './mongodb/userRepository';
import { createMongoSessionRepository } from './mongodb/sessionRepository';
import { createMongoIdValidator } from './mongodb/idValidator';
import { createSha256PasswordHasher } from './passwordHasher';
import { createJwtTokenService } from './tokenService';

export async function createPersistence(db: Db, config: Config) {
  const usersCollection = db.collection('users');
  const sessionsCollection = db.collection('sessions');

  await sessionsCollection.createIndex({ token: 1 });
  await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  return {
    userRepository: createMongoUserRepository(usersCollection),
    sessionRepository: createMongoSessionRepository(sessionsCollection),
    passwordHasher: createSha256PasswordHasher(config.passwordPepper),
    tokenService: createJwtTokenService(config.jwtSecret),
    idValidator: createMongoIdValidator()
  };
}
