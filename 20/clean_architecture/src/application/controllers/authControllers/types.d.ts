import type {
  PasswordHasher,
  Repository,
  TokenService
} from '../../../persistence/types';

export type AuthControllerDeps = {
  repository: Repository;
  passwordHasher: PasswordHasher;
  tokenService: TokenService;
};
