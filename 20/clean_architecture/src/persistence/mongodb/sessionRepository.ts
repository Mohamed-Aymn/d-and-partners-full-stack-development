import { ObjectId, type Collection, type WithId } from 'mongodb';
import { createSession, type Session } from '../../domain/entities/Session';
import type { SessionRepository } from '../types';

type SessionDocument = {
  token: string;
  userId: ObjectId;
  expiresAt: Date;
  createdAt: Date;
};

function toSession(document: WithId<SessionDocument> | null): Session | null {
  if (!document) {
    return null;
  }

  return createSession({
    id: document._id.toString(),
    token: document.token,
    userId: document.userId.toString(),
    expiresAt: document.expiresAt,
    createdAt: document.createdAt
  });
}

export function createMongoSessionRepository(
  collection: Collection
): SessionRepository {
  async function create({
    token,
    userId,
    expiresAt,
    createdAt
  }: {
    token: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
  }) {
    const result = await collection.insertOne({
      token,
      userId: new ObjectId(userId),
      expiresAt,
      createdAt
    });

    return createSession({
      id: result.insertedId.toString(),
      token,
      userId,
      expiresAt,
      createdAt
    });
  }

  async function findValidByToken(token: string) {
    const document = await collection.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });

    return toSession(document as WithId<SessionDocument> | null);
  }

  async function deleteByUserId(userId: string) {
    await collection.deleteMany({ userId: new ObjectId(userId) });
  }

  return {
    create,
    findValidByToken,
    deleteByUserId
  };
}
