import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { TokenPayload, TokenService } from './types';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function createJwtTokenService(secret?: string): TokenService {
  const resolvedSecret = secret || crypto.randomBytes(32).toString('hex');

  if (!secret) {
    console.warn('WARNING: JWT_SECRET environment variable is not set.');
  }

  function sign(userId: string) {
    return jwt.sign({ userId }, resolvedSecret, {
      expiresIn: SESSION_MAX_AGE_MS / 1000
    });
  }

  function verify(token: string): TokenPayload | null {
    try {
      const payload = jwt.verify(token, resolvedSecret);
      if (typeof payload === 'string') {
        return null;
      }
      return payload as TokenPayload;
    } catch {
      return null;
    }
  }

  return {
    sessionMaxAgeMs: SESSION_MAX_AGE_MS,
    sign,
    verify
  };
}
