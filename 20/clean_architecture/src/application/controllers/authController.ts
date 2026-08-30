import type { Request, Response } from 'express';
import { unauthorizedError, validationError } from '../../domain/errors/AppError';
import { toPublicUser } from '../../domain/entities/User';
import type {
  PasswordHasher,
  SessionRepository,
  TokenService,
  UserRepository
} from '../../persistence/types';

type AuthControllerDeps = {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  passwordHasher: PasswordHasher;
  tokenService: TokenService;
};

export function createAuthController({
  userRepository,
  sessionRepository,
  passwordHasher,
  tokenService
}: AuthControllerDeps) {
  async function create(req: Request, res: Response) {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      throw validationError('Email and password are required');
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw unauthorizedError('Invalid email or password');
    }

    const isValid = passwordHasher.verify(password, user.salt, user.passwordHash);
    if (!isValid) {
      throw unauthorizedError('Invalid email or password');
    }

    const token = tokenService.sign(user.id);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + tokenService.sessionMaxAgeMs);

    await sessionRepository.create({
      token,
      userId: user.id,
      expiresAt,
      createdAt: now
    });

    res.status(200).json({
      message: 'Sign-in successful',
      token,
      user: toPublicUser(user)
    });
  }

  return { create };
}

export type AuthController = ReturnType<typeof createAuthController>;
