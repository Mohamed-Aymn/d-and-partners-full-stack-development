import type { Session } from '../domain/entities/Session';
import type { User } from '../domain/entities/User';

export type UserRepository = {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    email: string;
    passwordHash: string;
    salt: string;
  }): Promise<User>;
  update(
    id: string,
    fields: {
      email?: string;
      passwordHash?: string;
      salt?: string;
    }
  ): Promise<User | null>;
  deleteById(id: string): Promise<boolean>;
};

export type SessionRepository = {
  create(data: {
    token: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
  }): Promise<Session>;
  findValidByToken(token: string): Promise<Session | null>;
  deleteByUserId(userId: string): Promise<void>;
};

export type PasswordHasher = {
  generateSalt(): string;
  hash(password: string, salt: string): string;
  verify(password: string, salt: string, passwordHash: string): boolean;
};

export type TokenPayload = {
  userId?: string;
};

export type TokenService = {
  sessionMaxAgeMs: number;
  sign(userId: string): string;
  verify(token: string): TokenPayload | null;
};

export type IdValidator = {
  isValid(id: string): boolean;
};
