const { validationError, unauthorizedError } = require('../../domain/errors/AppError');
const { toPublicUser } = require('../../domain/entities/User');

function createAuthController({
  userRepository,
  sessionRepository,
  passwordHasher,
  tokenService
}) {
  async function create(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw validationError('Email and password are required');
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw unauthorizedError('Invalid email or password');
    }

    const isValid = passwordHasher.verify(password, user.salt, user.passwordHash);
    if (!isValid) {
      throw unauthorizedError('Invalid email or password');
    }

    const token = tokenService.sign(user.id);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + tokenService.sessionMaxAgeMs);

    await sessionRepository.create({
      token,
      userId: user.id,
      expiresAt,
      createdAt: now
    });

    res.status(200).json({
      message: 'Sign-in successful',
      token,
      user: toPublicUser(user)
    });
  }

  return { create };
}

module.exports = createAuthController;
