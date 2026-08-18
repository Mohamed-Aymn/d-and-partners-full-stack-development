const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// ------------------------------------------------------------------
// Cryptographic Configuration & Helpers
// ------------------------------------------------------------------

// Secret key for cookie encryption (Must be 32 bytes for aes-256-gcm)
// In production, set this in your environment variables: process.env.COOKIE_SECRET
const COOKIE_SECRET = process.env.COOKIE_SECRET
  ? crypto.createHash('sha256').update(process.env.COOKIE_SECRET).digest()
  : crypto.randomBytes(32);

// Password Hashing Helper
const hashPasswordWithSalt = (password, salt) => {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
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

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const rawCookie = req.cookies.userId;

  // 1. Check if the authentication cookie exists
  if (!rawCookie) {
    return res.status(401).json({ message: 'Unauthorized: No session cookie provided' });
  }

  // 2. Decrypt the cookie value
  const decryptedUserId = decryptCookie(rawCookie);
  if (!decryptedUserId) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or tampered session cookie' });
  }

  // 3. Check if the authenticated user owns this resource
  if (decryptedUserId !== id) {
    return res.status(403).json({ message: "Forbidden: You cannot access other users' data" });
  }

  // 4. Validate ObjectId format
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

// Sign Up
app.post('/post', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
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

    const hashedPassword = hashPasswordWithSalt(password, user.salt);

    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Encrypt the user ID before setting the cookie
    const encryptedUserId = encryptCookie(user._id.toString());

    res.cookie('userId', encryptedUserId, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
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
});
