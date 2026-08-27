const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Application-wide secret pepper loaded from environment variables
const PEPPER = process.env.PASSWORD_PEPPER;
if (!PEPPER) {
  console.warn('WARNING: PASSWORD_PEPPER environment variable is not set.');
}

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET environment variable is not set.');
}

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 1 day

// Password Hashing Helper with Salt and Pepper
const hashPasswordWithSaltAndPepper = (password, salt) => {
  return crypto
    .createHash('sha256')
    .update(password + salt + (PEPPER || ''))
    .digest('hex');
};

// Sign a JWT containing the user ID
const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: SESSION_MAX_AGE_MS / 1000
  });
};

// Verify a JWT; returns payload or null if invalid/expired
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  hashPasswordWithSaltAndPepper,
  signToken,
  verifyToken,
  SESSION_MAX_AGE_MS
};
