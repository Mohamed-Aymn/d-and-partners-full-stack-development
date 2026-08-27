const crypto = require('crypto');

// Application-wide secret pepper loaded from environment variables
const PEPPER = process.env.PASSWORD_PEPPER;
if (!PEPPER) {
  console.warn('WARNING: PASSWORD_PEPPER environment variable is not set.');
}

// Secret key for cookie encryption (Must be 32 bytes for aes-256-gcm)
// In production, set this in your environment variables: process.env.COOKIE_SECRET
const COOKIE_SECRET = process.env.COOKIE_SECRET
  ? crypto.createHash('sha256').update(process.env.COOKIE_SECRET).digest()
  : crypto.randomBytes(32);

// Password Hashing Helper with Salt and Pepper
const hashPasswordWithSaltAndPepper = (password, salt) => {
  return crypto
    .createHash('sha256')
    .update(password + salt + (PEPPER || ''))
    .digest('hex');
};

// Cookie Encryption (AES-256-GCM)
const encryptCookie = (text) => {
  const iv = crypto.randomBytes(12); // 12-byte IV for GCM mode
  const cipher = crypto.createCipheriv('aes-256-gcm', COOKIE_SECRET, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  // Format: iv:authTag:encryptedPayload
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
};

// Cookie Decryption (AES-256-GCM)
const decryptCookie = (encryptedText) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) return null;

    const [ivHex, authTagHex, encryptedData] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', COOKIE_SECRET, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    // Returns null if the token has been tampered with or failed decryption
    return null;
  }
};

module.exports = {
  hashPasswordWithSaltAndPepper,
  encryptCookie,
  decryptCookie
};
