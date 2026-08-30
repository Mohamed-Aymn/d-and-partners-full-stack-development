import type { Db } from 'mongodb';
import type { Config } from './config';
import { createMongoRepository } from './repository';
import { createMongoIdValidator } from './mongodb/idValidator';
import { createSha256PasswordHasher } from './passwordHasher';
import { createJwtTokenService } from './tokenService';

export async function createPersistence(db: Db, config: Config) {
  const repository = createMongoRepository(db);

  return {
    repository,
    passwordHasher: createSha256PasswordHasher(config.passwordPepper),
    tokenService: createJwtTokenService(config.jwtSecret),
    idValidator: createMongoIdValidator()
  };
}
