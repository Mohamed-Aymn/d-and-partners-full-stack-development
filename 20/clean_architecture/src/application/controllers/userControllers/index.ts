import { createUserController } from './createUserController';
import { getUserController } from './getUserController';
import { updateUserController } from './updateUserController';
import { deleteUserController } from './deleteUserController';
import type { UserControllerDeps } from './types';

export function createUserControllers(deps: UserControllerDeps) {
  return {
    create: createUserController(deps),
    show: getUserController(deps),
    update: updateUserController(deps),
    destroy: deleteUserController(deps)
  };
}

export type UserController = ReturnType<typeof createUserControllers>;
