export type User = {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
};

export function createUser({ id, email, passwordHash, salt }: User): User {
  return { id, email, passwordHash, salt };
}

export function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email
  };
}

export function toSafeUserDocument(user: User) {
  return {
    _id: user.id,
    email: user.email
  };
}
