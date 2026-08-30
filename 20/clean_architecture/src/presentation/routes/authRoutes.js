const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');

function createAuthRouter({ authController }) {
  const router = express.Router();
  router.post('/', asyncHandler(authController.create));
  return router;
}

module.exports = createAuthRouter;
