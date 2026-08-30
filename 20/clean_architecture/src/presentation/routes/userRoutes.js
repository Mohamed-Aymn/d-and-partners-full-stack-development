const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const createAuthorizeUserMiddleware = require('../middlewares/authorizeUser');

function createUserRouter({ userController, authorizeUser }) {
  const router = express.Router();
  const authorize = createAuthorizeUserMiddleware(authorizeUser);

  router.post('/', asyncHandler(userController.create));
  router.get('/:id', authorize, asyncHandler(userController.show));
  router.put('/:id', authorize, asyncHandler(userController.update));
  router.delete('/:id', authorize, asyncHandler(userController.destroy));

  return router;
}

module.exports = createUserRouter;
