import type { Request, Response } from 'express';
import { unauthorizedError, validationError } from '../../errors/AppError';
import { toPublicUser, toUserRecord, USERS_COLLECTION } from '../../models/user';
import { SESSIONS_COLLECTION, type SessionSchema } from '../../models/session';
import type { AuthControllerDeps } from './types';

export function createAuthController({
  repository,
  passwordHasher,
  tokenService
}: AuthControllerDeps) {
  return async function createAuth(req: Request, res: Response) {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      throw validationError('Email and password are required');
    }

    const user = toUserRecord(
      await repository.findOne(USERS_COLLECTION, { email })
    );
    if (!user) {
      throw unauthorizedError('Invalid email or password');
    }

    const isValid = passwordHasher.verify(password, user.salt, user.password);
    if (!isValid) {
      throw unauthorizedError('Invalid email or password');
    }

    const token = tokenService.sign(user._id);
    const now = new Date();
    const session: SessionSchema = {
      token,
      userId: user._id,
      expiresAt: new Date(now.getTime() + tokenService.sessionMaxAgeMs),
      createdAt: now
    };

    await repository.insert(SESSIONS_COLLECTION, session);

    res.status(200).json({
      message: 'Sign-in successful',
      token,
      user: toPublicUser(user)
    });
  };
}
