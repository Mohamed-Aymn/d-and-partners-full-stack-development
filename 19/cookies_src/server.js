require('dotenv').config(); // MUST be the first line
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const createAuthorizeUser = require('./middleware/authorizeUser');
const {
  hashPasswordWithSaltAndPepper,
  encryptCookie
} = require('./helpers/crypto');

const app = express();
const PORT = 3000;
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 1 day

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
app.use(cookieParser());

// ------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

app.get('/users/:id', authorizeUser, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude password and salt from the response
    const { password, salt, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

app.put('/users/:id', authorizeUser, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: 'Email or password is required' });
  }

  try {
    const updateFields = {};

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      const salt = crypto.randomBytes(16).toString('hex');
      updateFields.salt = salt;
      updateFields.password = hashPasswordWithSaltAndPepper(password, salt);
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _password, salt: _salt, ...safeUser } = result;
    res.json(safeUser);
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
    res.clearCookie('userId');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// Sign Up
app.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPasswordWithSaltAndPepper(password, salt);

    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      salt: salt
    });

    res.status(201).json({
      id: result.insertedId,
      email
    });
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// Sign In
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const hashedPassword = hashPasswordWithSaltAndPepper(password, user.salt);

    const isValid = crypto.timingSafeEqual(
      Buffer.from(user.password, 'utf8'),
      Buffer.from(hashedPassword, 'utf8')
    );

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Encrypt the user ID before setting the cookie
    const encryptedUserId = encryptCookie(user._id.toString());
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);

    await sessionsCollection.insertOne({
      cookie: encryptedUserId,
      userId: user._id,
      expiresAt,
      createdAt: new Date()
    });

    res.cookie('userId', encryptedUserId, {
      httpOnly: true,
      maxAge: SESSION_MAX_AGE_MS
    });

    res.status(200).json({
      message: 'Sign-in successful',
      user: {
        id: user._id,
        email: user.email
      }
    });
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

  await sessionsCollection.createIndex({ cookie: 1 });
  await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});