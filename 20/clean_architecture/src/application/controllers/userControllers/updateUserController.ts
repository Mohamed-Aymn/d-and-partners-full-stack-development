import type { Request, Response } from 'express';
import { notFoundError, validationError } from '../../errors/AppError';
import {
  toSafeUser,
  toUserRecord,
  USERS_COLLECTION,
  type UserSchema
} from '../../models/user';
import type { UserControllerDeps } from './types';

export function updateUserController({
  repository,
  passwordHasher
}: UserControllerDeps) {
  return async function updateUser(req: Request, res: Response) {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email && !password) {
      throw validationError('Email or password is required');
    }

    const data: Partial<UserSchema> = {};

    if (email) {
      data.email = email;
    }

    if (password) {
      const salt = passwordHasher.generateSalt();
      data.salt = salt;
      data.password = passwordHasher.hash(password, salt);
    }

    const user = toUserRecord(
      await repository.updateById(
        USERS_COLLECTION,
        req.params.id as string,
        data
      )
    );
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUser(user));
  };
}
