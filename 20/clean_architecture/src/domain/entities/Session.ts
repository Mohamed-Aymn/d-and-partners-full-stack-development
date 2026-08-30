export type Session = {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
};

export function createSession({
  id,
  token,
  userId,
  expiresAt,
  createdAt
}: Session): Session {
  return { id, token, userId, expiresAt, createdAt };
}

export function isSessionExpired(session: Session, now = new Date()) {
  return session.expiresAt <= now;
}
