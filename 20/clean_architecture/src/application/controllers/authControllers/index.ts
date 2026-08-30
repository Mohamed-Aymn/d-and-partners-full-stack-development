import { createAuthController } from './createAuthController';
import type { AuthControllerDeps } from './types';

export function createAuthControllers(deps: AuthControllerDeps) {
  return {
    create: createAuthController(deps)
  };
}

export type AuthController = ReturnType<typeof createAuthControllers>;
