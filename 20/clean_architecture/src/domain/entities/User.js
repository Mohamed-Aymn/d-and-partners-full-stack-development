function createUser({ id, email, passwordHash, salt }) {
  return { id, email, passwordHash, salt };
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email
  };
}

function toSafeUserDocument(user) {
  return {
    _id: user.id,
    email: user.email
  };
}

module.exports = {
  createUser,
  toPublicUser,
  toSafeUserDocument
};
