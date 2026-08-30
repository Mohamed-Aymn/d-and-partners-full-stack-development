import { ObjectId } from 'mongodb';
import type { IdValidator } from '../types';

export function createMongoIdValidator(): IdValidator {
  function isValid(id: string) {
    return ObjectId.isValid(id);
  }

  return { isValid };
}
