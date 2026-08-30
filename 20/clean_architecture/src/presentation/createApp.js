const express = require('express');
const cors = require('cors');
const createUserRouter = require('./routes/userRoutes');
const createAuthRouter = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

function createApp(dependencies) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (_req, res) => {
    res.send('Welcome to the Express App!');
  });

  app.use('/users', createUserRouter(dependencies));
  app.use('/auth', createAuthRouter(dependencies));
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
