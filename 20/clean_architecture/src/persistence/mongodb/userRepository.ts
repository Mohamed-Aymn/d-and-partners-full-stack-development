import { ObjectId, type Collection, type WithId } from 'mongodb';
import { createUser, type User } from '../../domain/entities/User';
import type { UserRepository } from '../types';

type UserDocument = {
  email: string;
  password: string;
  salt: string;
};

function toUser(document: WithId<UserDocument> | null): User | null {
  if (!document) {
    return null;
  }

  return createUser({
    id: document._id.toString(),
    email: document.email,
    passwordHash: document.password,
    salt: document.salt
  });
}

export function createMongoUserRepository(collection: Collection): UserRepository {
  async function findById(id: string) {
    const document = await collection.findOne({ _id: new ObjectId(id) });
    return toUser(document as WithId<UserDocument> | null);
  }

  async function findByEmail(email: string) {
    const document = await collection.findOne({ email });
    return toUser(document as WithId<UserDocument> | null);
  }

  async function create({
    email,
    passwordHash,
    salt
  }: {
    email: string;
    passwordHash: string;
    salt: string;
  }) {
    const result = await collection.insertOne({
      email,
      password: passwordHash,
      salt
    });

    return createUser({
      id: result.insertedId.toString(),
      email,
      passwordHash,
      salt
    });
  }

  async function update(
    id: string,
    fields: {
      email?: string;
      passwordHash?: string;
      salt?: string;
    }
  ) {
    const updateFields: Partial<UserDocument> = {};

    if (fields.email) {
      updateFields.email = fields.email;
    }

    if (fields.passwordHash) {
      updateFields.password = fields.passwordHash;
    }

    if (fields.salt) {
      updateFields.salt = fields.salt;
    }

    const document = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    return toUser(document as WithId<UserDocument> | null);
  }

  async function deleteById(id: string) {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  return {
    findById,
    findByEmail,
    create,
    update,
    deleteById
  };
}
