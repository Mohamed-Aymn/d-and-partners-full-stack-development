import type { Request, Response } from 'express';
import { notFoundError, validationError } from '../../domain/errors/AppError';
import { toSafeUserDocument } from '../../domain/entities/User';
import type {
  PasswordHasher,
  SessionRepository,
  UserRepository
} from '../../persistence/types';

type UserControllerDeps = {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  passwordHasher: PasswordHasher;
};

export function createUserController({
  userRepository,
  sessionRepository,
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
    const passwordHash = passwordHasher.hash(password, salt);
    const user = await userRepository.create({
      email,
      passwordHash,
      salt
    });

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  }

  async function show(req: Request, res: Response) {
    const user = await userRepository.findById(req.params.id as string);
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUserDocument(user));
  }

  async function update(req: Request, res: Response) {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email && !password) {
      throw validationError('Email or password is required');
    }

    const fields: {
      email?: string;
      passwordHash?: string;
      salt?: string;
    } = {};

    if (email) {
      fields.email = email;
    }

    if (password) {
      const salt = passwordHasher.generateSalt();
      fields.salt = salt;
      fields.passwordHash = passwordHasher.hash(password, salt);
    }

    const user = await userRepository.update(req.params.id as string, fields);
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUserDocument(user));
  }

  async function destroy(req: Request, res: Response) {
    const id = req.params.id as string;
    const deleted = await userRepository.deleteById(id);
    if (!deleted) {
      throw notFoundError('User not found');
    }

    await sessionRepository.deleteByUserId(id);
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
