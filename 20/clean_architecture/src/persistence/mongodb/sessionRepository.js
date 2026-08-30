const { ObjectId } = require('mongodb');
const { createSession } = require('../../domain/entities/Session');

function toSession(document) {
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

function createMongoSessionRepository(collection) {
  async function create({ token, userId, expiresAt, createdAt }) {
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

  async function findValidByToken(token) {
    const document = await collection.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });

    return toSession(document);
  }

  async function deleteByUserId(userId) {
    await collection.deleteMany({ userId: new ObjectId(userId) });
  }

  return {
    create,
    findValidByToken,
    deleteByUserId
  };
}

module.exports = createMongoSessionRepository;
