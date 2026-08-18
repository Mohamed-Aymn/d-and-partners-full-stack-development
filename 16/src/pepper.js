require('dotenv').config(); // MUST be the first line
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Application-wide secret pepper loaded from environment variables
const PEPPER = process.env.PASSWORD_PEPPER;
if (!PEPPER) {
  console.warn('WARNING: PASSWORD_PEPPER environment variable is not set.');
}

// Helper function to hash password with both per-user salt and app-level pepper
const hashPasswordWithSaltAndPepper = (password, salt) => {
  return crypto
    .createHash('sha256')
    .update(password + salt + (PEPPER || ''))
    .digest('hex');
};

// MongoDB Connection URI and Database Name
const DB_NAME = 'mydb';
const DB_PORT = '27017';
const DB_HOST = 'localhost';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

let usersCollection;

// Middleware to parse incoming JSON payload in request bodies
app.use(express.json());
app.use(cors());

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0, salt: 0 } } // Exclude sensitive fields
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// ------------------------------------------------------------------
// 1. Sign Up (Generate unique salt, hash with salt + pepper, store salt)
// ------------------------------------------------------------------
app.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Generate a random 16-byte cryptographically secure salt
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

// ------------------------------------------------------------------
// 2. Sign In (Fetch user, hash input with stored salt + pepper, compare)
// ------------------------------------------------------------------
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // 1. Find user by email to retrieve their specific salt
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Hash the incoming password using stored salt and the app pepper
    const hashedPassword = hashPasswordWithSaltAndPepper(password, user.salt);

    // 3. Compare the computed hash with the stored hash using timing-safe comparison
    const isValid = crypto.timingSafeEqual(
      Buffer.from(user.password, 'utf8'),
      Buffer.from(hashedPassword, 'utf8')
    );

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

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
});