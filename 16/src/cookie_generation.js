const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto')
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Helper function to create a plain SHA-256 hash
// Helper function to hash password with a provided salt using SHA-256
const hashPasswordWithSalt = (password, salt) => {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
};

// MongoDB Connection URI and Database Name
// Format: mongodb://<username>:<password>@<host>:<port>/<database>?authSource=<authDB>
const DB_NAME = 'mydb';
const DB_PORT = "27017";
const DB_HOST = "localhost";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

let usersCollection;

// Middleware to parse incoming JSON payload in request bodies
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ------------------------------------------------------------------
// Base Route
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.cookies;

  // 1. Check if the authentication cookie exists
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No session cookie provided' });
  }

  // 2. Check if the authenticated user owns this resource
  if (userId !== id) {
    return res.status(403).json({ message: 'Forbidden: You cannot access other users\' data' });
  }

  // 3. Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

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

// ------------------------------------------------------------------
// 1. Sign Up (Generate unique salt, hash password, store both)
// ------------------------------------------------------------------
app.post('/post', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Generate a random 16-byte cryptographically secure salt
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPasswordWithSalt(password, salt);

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

// ------------------------------------------------------------------
// 2. Sign In (Fetch user, hash input with stored salt, compare)
// ------------------------------------------------------------------
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

    const hashedPassword = hashPasswordWithSalt(password, user.salt);

    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set cookie containing the user's ID
    res.cookie('userId', user._id.toString(), {
      httpOnly: true, // Prevents client-side JS access (XSS protection)
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
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

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
})
