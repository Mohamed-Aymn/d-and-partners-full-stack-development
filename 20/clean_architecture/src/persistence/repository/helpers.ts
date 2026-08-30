import { ObjectId, type Document, type WithId } from 'mongodb';
import type { StoredDocument } from '../types';

export function toStoredDocument(document: WithId<Document> | null): StoredDocument | null {
  if (!document) {
    return null;
  }

  const { _id, ...fields } = document;
  return {
    ...fields,
    _id: _id.toString()
  };
}

export function toObjectId(id: string) {
  return new ObjectId(id);
}