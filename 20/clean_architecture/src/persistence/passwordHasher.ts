import crypto from 'node:crypto';
import type { PasswordHasher } from './types';

export function createSha256PasswordHasher(pepper?: string): PasswordHasher {
  const resolvedPepper = pepper || '';

  if (!pepper) {
    console.warn('WARNING: PASSWORD_PEPPER environment variable is not set.');
  }

  function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
  }

  function hash(password: string, salt: string) {
    return crypto
      .createHash('sha256')
      .update(password + salt + resolvedPepper)
      .digest('hex');
  }

  function verify(password: string, salt: string, passwordHash: string) {
    const hashedPassword = hash(password, salt);

    return crypto.timingSafeEqual(
      Buffer.from(passwordHash, 'utf8'),
      Buffer.from(hashedPassword, 'utf8')
    );
  }

  return {
    generateSalt,
    hash,
    verify
  };
}
