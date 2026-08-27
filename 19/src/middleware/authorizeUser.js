const { ObjectId } = require('mongodb');
const { decryptCookie } = require('../helpers/crypto');

// Authorization: require a valid session cookie and ownership of :id
const authorizeUser = (req, res, next) => {
  const { id } = req.params;
  const rawCookie = req.cookies.userId;

  if (!rawCookie) {
    return res.status(401).json({ message: 'Unauthorized: No session cookie provided' });
  }

  const decryptedUserId = decryptCookie(rawCookie);
  if (!decryptedUserId) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or tampered session cookie' });
  }

  if (decryptedUserId !== id) {
    return res.status(403).json({ message: "Forbidden: You cannot access other users' data" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  req.authenticatedUserId = decryptedUserId;
  next();
};

module.exports = authorizeUser;
