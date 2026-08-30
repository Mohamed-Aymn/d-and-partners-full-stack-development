function createSession({ id, token, userId, expiresAt, createdAt }) {
  return { id, token, userId, expiresAt, createdAt };
}

function isSessionExpired(session, now = new Date()) {
  return session.expiresAt <= now;
}

module.exports = {
  createSession,
  isSessionExpired
};
