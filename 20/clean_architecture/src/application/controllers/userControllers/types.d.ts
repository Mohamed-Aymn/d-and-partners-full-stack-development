import type { PasswordHasher, Repository } from '../../../persistence/types';

export type UserControllerDeps = {
  repository: Repository;
  passwordHasher: PasswordHasher;
};
