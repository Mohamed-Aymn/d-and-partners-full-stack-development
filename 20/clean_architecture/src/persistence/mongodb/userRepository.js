const { ObjectId } = require('mongodb');
const { createUser } = require('../../domain/entities/User');

function toUser(document) {
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

function createMongoUserRepository(collection) {
  async function findById(id) {
    const document = await collection.findOne({ _id: new ObjectId(id) });
    return toUser(document);
  }

  async function findByEmail(email) {
    const document = await collection.findOne({ email });
    return toUser(document);
  }

  async function create({ email, passwordHash, salt }) {
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

  async function update(id, fields) {
    const updateFields = {};

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

    return toUser(document);
  }

  async function deleteById(id) {
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

module.exports = createMongoUserRepository;
