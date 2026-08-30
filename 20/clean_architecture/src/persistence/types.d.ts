export type StoredDocument = {
  _id: string;
  [key: string]: unknown;
};

export type Repository = {
  findById(collection: string, id: string): Promise<StoredDocument | null>;
  findOne(
    collection: string,
    filter: Record<string, unknown>
  ): Promise<StoredDocument | null>;
  insert(
    collection: string,
    data: Record<string, unknown>
  ): Promise<StoredDocument>;
  updateById(
    collection: string,
    id: string,
    data: Record<string, unknown>
  ): Promise<StoredDocument | null>;
  deleteById(collection: string, id: string): Promise<boolean>;
  deleteMany(
    collection: string,
    filter: Record<string, unknown>
  ): Promise<void>;
  createIndex(
    collection: string,
    keys: Record<string, 1 | -1>,
    options?: { expireAfterSeconds?: number }
  ): Promise<void>;
};

export type PasswordHasher = {
  generateSalt(): string;
  hash(password: string, salt: string): string;
  verify(password: string, salt: string, passwordHash: string): boolean;
};

export type TokenPayload = {
  userId?: string;
};

export type TokenService = {
  sessionMaxAgeMs: number;
  sign(userId: string): string;
  verify(token: string): TokenPayload | null;
};

export type IdValidator = {
  isValid(id: string): boolean;
};
