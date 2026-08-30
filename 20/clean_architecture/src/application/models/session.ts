import type { Repository, StoredDocument } from '../../persistence/types';

export const SESSIONS_COLLECTION = 'sessions';

export type SessionSchema = {
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
};

export type SessionRecord = SessionSchema & { _id: string };

export function toSessionRecord(
  document: StoredDocument | null
): SessionRecord | null {
  if (!document) {
    return null;
  }

  return {
    _id: document._id,
    token: String(document.token),
    userId: String(document.userId),
    expiresAt: new Date(document.expiresAt as Date),
    createdAt: new Date(document.createdAt as Date)
  };
}

export async function ensureSessionIndexes(repository: Repository) {
  await repository.createIndex(SESSIONS_COLLECTION, { token: 1 });
  await repository.createIndex(
    SESSIONS_COLLECTION,
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );
}
