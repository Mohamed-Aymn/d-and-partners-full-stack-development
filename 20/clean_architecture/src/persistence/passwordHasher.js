const crypto = require('crypto');

function createSha256PasswordHasher(pepper) {
  const resolvedPepper = pepper || '';

  if (!pepper) {
    console.warn('WARNING: PASSWORD_PEPPER environment variable is not set.');
  }

  function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
  }

  function hash(password, salt) {
    return crypto
      .createHash('sha256')
      .update(password + salt + resolvedPepper)
      .digest('hex');
  }

  function verify(password, salt, passwordHash) {
    const hashedPassword = hash(password, salt);

    return crypto.timingSafeEqual(
      Buffer.from(passwordHash, 'utf8'),
      Buffer.from(hashedPassword, 'utf8')
    );
  }

  return {
    generateSalt,
    hash,
    verify
  };
}

module.exports = createSha256PasswordHasher;
