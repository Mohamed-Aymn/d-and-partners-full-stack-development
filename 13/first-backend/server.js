const express = require('express');
const app = express();

// 1. GET Route - Homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// 2. GET Route - Fetching data
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
