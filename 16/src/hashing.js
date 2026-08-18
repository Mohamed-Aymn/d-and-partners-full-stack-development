require('dotenv').config(); // MUST be the first line
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto')

const app = express();
const PORT = 3000;

// Helper function to create a plain SHA-256 hash
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
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

// ------------------------------------------------------------------
// Base Route
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// ------------------------------------------------------------------
// 2. READ ONE (GET) - Retrieve user by ID
// ------------------------------------------------------------------
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
});

// ------------------------------------------------------------------
// 1. Sign Up (Create User with Hashed Password)
// ------------------------------------------------------------------
app.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = hashPassword(password);

    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword
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
// 2. Sign In (Hash Input and Compare)
// ------------------------------------------------------------------
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = hashPassword(password);

    // Look for the user matching email and the hashed password
    const user = await usersCollection.findOne({
      email,
      password: hashedPassword
    });

    if (!user) {
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
})
