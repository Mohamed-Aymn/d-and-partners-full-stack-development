const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// MongoDB Connection URI and Database Name
// Format: mongodb://<username>:<password>@<host>:<port>/<database>?authSource=<authDB>
const DB_NAME = 'mydb';
const DB_USER = 'root';
const DB_PASSWORD = "my-secret-pw";
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${DB_NAME}?authSource=admin`;

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
// 1. READ ALL (GET) - Retrieve all users
// ------------------------------------------------------------------
app.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something happened', error: error.message });
  }
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
// 3. CREATE (POST) - Add a new user
// ------------------------------------------------------------------
app.post('/users', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {


    let result;
    if (phone) {
      result = await usersCollection.insertOne({ name, email, phone });
    } else {
      result = await usersCollection.insertOne({ name, email });
    }



    res.status(201).json({
      id: result.insertedId,
      name,
      email
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