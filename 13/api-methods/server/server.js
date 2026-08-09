const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payload in request bodies
app.use(express.json());
app.use(cors());
let users = [
  { id: 1, name: 'Mohamed', email: "test@test.test" },
  { id: 2, name: 'Ahmed', price: "test@2test.test" }
];


// ------------------------------------------------------------------
// 1. READ ALL (GET) - Retrieve all users
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});


app.get('/users', (req, res) => {
  res.json(users);
});


// ------------------------------------------------------------------
// 3. CREATE (POST) - Add a new user
// ------------------------------------------------------------------
app.post('/create-a-user', (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || email === undefined) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // business logic
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email
  };

  // save in the database
  users.push(newUser);


  // return status to the client
  res.status(201).json(newUser);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});