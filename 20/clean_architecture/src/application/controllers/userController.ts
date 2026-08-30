import type { Request, Response } from 'express';
import { notFoundError, validationError } from '../errors/AppError';
import type { PasswordHasher, Repository } from '../../persistence/types';
import {
  toSafeUser,
  toUserRecord,
  USERS_COLLECTION,
  type UserSchema
} from '../models/user';
import { SESSIONS_COLLECTION } from '../models/session';

type UserControllerDeps = {
  repository: Repository;
  passwordHasher: PasswordHasher;
};

export function createUserController({
  repository,
  passwordHasher
}: UserControllerDeps) {
  async function create(req: Request, res: Response) {
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
  }

  async function show(req: Request, res: Response) {
    const user = toUserRecord(
      await repository.findById(USERS_COLLECTION, req.params.id as string)
    );
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUser(user));
  }

  async function update(req: Request, res: Response) {
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
  }

  async function destroy(req: Request, res: Response) {
    const id = req.params.id as string;
    const deleted = await repository.deleteById(USERS_COLLECTION, id);
    if (!deleted) {
      throw notFoundError('User not found');
    }

    await repository.deleteMany(SESSIONS_COLLECTION, { userId: id });
    res.status(200).json({ message: 'User deleted successfully' });
  }

  return {
    create,
    show,
    update,
    destroy
  };
}

export type UserController = ReturnType<typeof createUserController>;
