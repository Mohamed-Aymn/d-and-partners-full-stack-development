const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function createJwtTokenService(secret) {
  const resolvedSecret = secret || crypto.randomBytes(32).toString('hex');

  if (!secret) {
    console.warn('WARNING: JWT_SECRET environment variable is not set.');
  }

  function sign(userId) {
    return jwt.sign({ userId }, resolvedSecret, {
      expiresIn: SESSION_MAX_AGE_MS / 1000
    });
  }

  function verify(token) {
    try {
      return jwt.verify(token, resolvedSecret);
    } catch (_err) {
      return null;
    }
  }

  return {
    sessionMaxAgeMs: SESSION_MAX_AGE_MS,
    sign,
    verify
  };
}

module.exports = createJwtTokenService;
