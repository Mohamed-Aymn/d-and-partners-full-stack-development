const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET environment variable is not set.');
}

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 1 day
const OAUTH_STATE_MAX_AGE_SEC = 10 * 60; // 10 minutes

const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: SESSION_MAX_AGE_MS / 1000
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const signOAuthState = () => {
  return jwt.sign({ purpose: 'github-oauth' }, JWT_SECRET, {
    expiresIn: OAUTH_STATE_MAX_AGE_SEC
  });
};

const verifyOAuthState = (state) => {
  try {
    const payload = jwt.verify(state, JWT_SECRET);
    return payload.purpose === 'github-oauth';
  } catch (err) {
    return false;
  }
};

module.exports = {
  signToken,
  verifyToken,
  signOAuthState,
  verifyOAuthState,
  SESSION_MAX_AGE_MS
};
