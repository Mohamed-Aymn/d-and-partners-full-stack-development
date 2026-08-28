require('dotenv').config(); // MUST be the first line
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const createAuthorizeUser = require('./middlewares/authorizeUser');
const {
  signToken,
  signOAuthState,
  verifyOAuthState,
  SESSION_MAX_AGE_MS
} = require('./helpers/crypto');
const {
  getAuthorizationUrl,
  exchangeCodeForToken,
  getGitHubUser
} = require('./helpers/github');

const app = express();
const PORT = 3000;

// ------------------------------------------------------------------
// Database Configuration
// ------------------------------------------------------------------
const DB_NAME = 'mydb';
const DB_PORT = '27017';
const DB_HOST = 'localhost';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

let usersCollection;
let sessionsCollection;

const authorizeUser = createAuthorizeUser(() => sessionsCollection);

// ------------------------------------------------------------------
// Global Middleware
// ------------------------------------------------------------------
app.use(express.json());
app.use(cors());

// ------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Start GitHub OAuth flow
app.get('/auth/github', (req, res) => {
  try {
    const state = signOAuthState();
    const authorizationUrl = getAuthorizationUrl(state);
    res.redirect(authorizationUrl);
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// GitHub OAuth callback
app.get('/auth/github/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ message: 'Missing OAuth code or state' });
  }

  if (!verifyOAuthState(state)) {
    return res.status(400).json({ message: 'Invalid or expired OAuth state' });
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    const githubUser = await getGitHubUser(accessToken);

    let user = await usersCollection.findOne({ githubId: githubUser.githubId });

    if (!user) {
      const insertResult = await usersCollection.insertOne({
        githubId: githubUser.githubId,
        username: githubUser.username,
        email: githubUser.email,
        name: githubUser.name,
        avatarUrl: githubUser.avatarUrl,
        createdAt: new Date()
      });

      user = {
        _id: insertResult.insertedId,
        ...githubUser
      };
    } else {
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            username: githubUser.username,
            email: githubUser.email,
            name: githubUser.name,
            avatarUrl: githubUser.avatarUrl,
            updatedAt: new Date()
          }
        }
      );
    }

    const token = signToken(user._id.toString());
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

    await sessionsCollection.insertOne({
      token,
      userId: user._id,
      provider: 'github',
      expiresAt,
      createdAt: new Date()
    });

    res.status(200).json({
      message: 'GitHub sign-in successful',
      token,
      user: {
        id: user._id,
        githubId: githubUser.githubId,
        username: githubUser.username,
        email: githubUser.email,
        name: githubUser.name,
        avatarUrl: githubUser.avatarUrl
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

app.get('/users/:id', authorizeUser, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      githubId: user.githubId,
      username: user.username,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

app.put('/users/:id', authorizeUser, async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  if (!email && !name) {
    return res.status(400).json({ message: 'Email or name is required' });
  }

  try {
    const updateFields = {};

    if (email) {
      updateFields.email = email;
    }

    if (name) {
      updateFields.name = name;
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: result._id,
      githubId: result.githubId,
      username: result.username,
      email: result.email,
      name: result.name,
      avatarUrl: result.avatarUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

app.delete('/users/:id', authorizeUser, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await sessionsCollection.deleteMany({ userId: new ObjectId(id) });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// ------------------------------------------------------------------
// Server & Database Initialization
// ------------------------------------------------------------------
async function start() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db(DB_NAME);
  usersCollection = db.collection('users');
  sessionsCollection = db.collection('sessions');

  await usersCollection.createIndex({ githubId: 1 }, { unique: true });
  await sessionsCollection.createIndex({ token: 1 });
  await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
