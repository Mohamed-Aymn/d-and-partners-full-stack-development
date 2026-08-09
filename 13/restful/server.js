const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payload in request bodies
app.use(express.json());

let users = [
  { id: 1, name: 'Mohamed', email: 'test@test.test' },
  { id: 2, name: 'Ahmed', email: 'test@2test.test' }
];

app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// ------------------------------------------------------------------
// 1. READ ALL (GET) - Retrieve all users
// ------------------------------------------------------------------
app.get('/users', (req, res) => {
  res.json(users);
});

// ------------------------------------------------------------------
// 2. READ ONE (GET) - Retrieve a single user by id
// ------------------------------------------------------------------
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// ------------------------------------------------------------------
// 3. CREATE (POST) - Add a new user
// ------------------------------------------------------------------
app.post('/users', (req, res) => {
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

// ------------------------------------------------------------------
// 4. UPDATE (PUT) - Replace a user by id
// ------------------------------------------------------------------
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email } = req.body;

  if (!name || email === undefined) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const updatedUser = { id, name, email };
  users[userIndex] = updatedUser;

  res.json(updatedUser);
});

// ------------------------------------------------------------------
// 5. DELETE (DELETE) - Remove a user by id
// ------------------------------------------------------------------
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
