import type { Request, Response } from 'express';
import { validationError } from '../../errors/AppError';
import {
  toUserRecord,
  USERS_COLLECTION,
  type UserSchema
} from '../../models/user';
import type { UserControllerDeps } from './types';

export function createUserController({
  repository,
  passwordHasher
}: UserControllerDeps) {
  return async function createUser(req: Request, res: Response) {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      throw validationError('Email and password are required');
    }

    const salt = passwordHasher.generateSalt();
    const data: UserSchema = {
      email,
      password: passwordHasher.hash(password, salt),
      salt
    };

    const created = await repository.insert(USERS_COLLECTION, data);
    const user = toUserRecord(created);

    res.status(201).json({
      id: user?._id,
      email: user?.email
    });
  };
}
