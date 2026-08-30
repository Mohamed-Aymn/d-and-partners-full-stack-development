import type { StoredDocument } from '../../persistence/types';

export const USERS_COLLECTION = 'users';

export type UserSchema = {
  email: string;
  password: string;
  salt: string;
};

export type UserRecord = UserSchema & { _id: string };

export function toUserRecord(document: StoredDocument | null): UserRecord | null {
  if (!document) {
    return null;
  }

  return {
    _id: document._id,
    email: String(document.email),
    password: String(document.password),
    salt: String(document.salt)
  };
}

export function toSafeUser(user: UserRecord) {
  return {
    _id: user._id,
    email: user.email
  };
}

export function toPublicUser(user: UserRecord) {
  return {
    id: user._id,
    email: user.email
  };
}
