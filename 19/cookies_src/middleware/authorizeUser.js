const { ObjectId } = require('mongodb');

// Authorization: require a valid DB session cookie and ownership of :id
const createAuthorizeUser = (getSessionsCollection) => async (req, res, next) => {
  const { id } = req.params;
  const rawCookie = req.cookies.userId;

  if (!rawCookie) {
    return res.status(401).json({ message: 'Unauthorized: No session cookie provided' });
  }

  try {
    const sessionsCollection = getSessionsCollection();
    const session = await sessionsCollection.findOne({
      cookie: rawCookie,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired session' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const authenticatedUserId = session.userId.toString();

    if (authenticatedUserId !== id) {
      return res.status(403).json({ message: "Forbidden: You cannot access other users' data" });
    }

    req.authenticatedUserId = authenticatedUserId;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
};

module.exports = createAuthorizeUser;
