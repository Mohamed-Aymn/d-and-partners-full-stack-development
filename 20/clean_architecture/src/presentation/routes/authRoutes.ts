import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import type { AuthController } from '../../application/controllers/authControllers';

type AuthRouterDeps = {
  authController: AuthController;
};

export function createAuthRouter({ authController }: AuthRouterDeps) {
  const router = Router();
  router.post('/', asyncHandler(authController.create));
  return router;
}
