import express from 'express';
import cors from 'cors';
import { createUserRouter } from './routes/userRoutes';
import { createAuthRouter } from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import type { UserController } from '../application/controllers/userControllers';
import type { AuthController } from '../application/controllers/authControllers';
import type { AuthorizeUserDeps } from './middlewares/authorizeUser';

export type AppDependencies = {
  userController: UserController;
  authController: AuthController;
  authorizeUser: AuthorizeUserDeps;
};

export function createApp(dependencies: AppDependencies) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (_req, res) => {
    res.send('Welcome to the Express App!');
  });

  app.use('/users', createUserRouter(dependencies));
  app.use('/auth', createAuthRouter(dependencies));
  app.use(errorHandler);

  return app;
}
