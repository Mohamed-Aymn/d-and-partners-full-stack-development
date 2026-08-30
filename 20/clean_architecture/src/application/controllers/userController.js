const {
  validationError,
  notFoundError
} = require('../../domain/errors/AppError');
const { toSafeUserDocument } = require('../../domain/entities/User');

function createUserController({ userRepository, sessionRepository, passwordHasher }) {
  async function create(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw validationError('Email and password are required');
    }

    const salt = passwordHasher.generateSalt();
    const passwordHash = passwordHasher.hash(password, salt);
    const user = await userRepository.create({
      email,
      passwordHash,
      salt
    });

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  }

  async function show(req, res) {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUserDocument(user));
  }

  async function update(req, res) {
    const { email, password } = req.body;

    if (!email && !password) {
      throw validationError('Email or password is required');
    }

    const fields = {};

    if (email) {
      fields.email = email;
    }

    if (password) {
      const salt = passwordHasher.generateSalt();
      fields.salt = salt;
      fields.passwordHash = passwordHasher.hash(password, salt);
    }

    const user = await userRepository.update(req.params.id, fields);
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUserDocument(user));
  }

  async function destroy(req, res) {
    const deleted = await userRepository.deleteById(req.params.id);
    if (!deleted) {
      throw notFoundError('User not found');
    }

    await sessionRepository.deleteByUserId(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  }

  return {
    create,
    show,
    update,
    destroy
  };
}

module.exports = createUserController;
