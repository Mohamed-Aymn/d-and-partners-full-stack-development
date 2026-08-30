import { type Db } from 'mongodb';
import type { Repository } from '../types';
import { toObjectId, toStoredDocument } from './helpers';

export function createMongoRepository(db: Db): Repository {
  function collection(name: string) {
    return db.collection(name);
  }

  async function findById(name: string, id: string) {
    const document = await collection(name).findOne({ _id: toObjectId(id) });
    return toStoredDocument(document);
  }

  async function findOne(name: string, filter: Record<string, unknown>) {
    const document = await collection(name).findOne(filter);
    return toStoredDocument(document);
  }

  async function insert(name: string, data: Record<string, unknown>) {
    const result = await collection(name).insertOne(data);
    return {
      ...data,
      _id: result.insertedId.toString()
    };
  }

  async function updateById(
    name: string,
    id: string,
    data: Record<string, unknown>
  ) {
    const document = await collection(name).findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    );

    return toStoredDocument(document);
  }

  async function deleteById(name: string, id: string) {
    const result = await collection(name).deleteOne({ _id: toObjectId(id) });
    return result.deletedCount > 0;
  }

  async function deleteMany(name: string, filter: Record<string, unknown>) {
    await collection(name).deleteMany(filter);
  }

  async function createIndex(
    name: string,
    keys: Record<string, 1 | -1>,
    options?: { expireAfterSeconds?: number }
  ) {
    await collection(name).createIndex(keys, options);
  }

  return {
    findById,
    findOne,
    insert,
    updateById,
    deleteById,
    deleteMany,
    createIndex
  };
}