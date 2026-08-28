const { ObjectId } = require('mongodb');
const { verifyToken } = require('../helpers/crypto');

// Authorization: require a valid DB session JWT and ownership of :id
const createAuthorizeUser = (getSessionsCollection) => async (req, res, next) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No bearer token provided' });
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);
    if (!payload || !payload.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }

    const sessionsCollection = getSessionsCollection();
    const session = await sessionsCollection.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired session' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const authenticatedUserId = session.userId.toString();

    if (authenticatedUserId !== id || authenticatedUserId !== payload.userId) {
      return res.status(403).json({ message: "Forbidden: You cannot access other users' data" });
    }

    req.authenticatedUserId = authenticatedUserId;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
};

module.exports = createAuthorizeUser;
