import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import {
  createAuthorizeUserMiddleware,
  type AuthorizeUserDeps
} from '../middlewares/authorizeUser';
import type { UserController } from '../../application/controllers/userControllers';

type UserRouterDeps = {
  userController: UserController;
  authorizeUser: AuthorizeUserDeps;
};

export function createUserRouter({ userController, authorizeUser }: UserRouterDeps) {
  const router = Router();
  const authorize = createAuthorizeUserMiddleware(authorizeUser);

  router.post('/', asyncHandler(userController.create));
  router.get('/:id', authorize, asyncHandler(userController.show));
  router.put('/:id', authorize, asyncHandler(userController.update));
  router.delete('/:id', authorize, asyncHandler(userController.destroy));

  return router;
}
