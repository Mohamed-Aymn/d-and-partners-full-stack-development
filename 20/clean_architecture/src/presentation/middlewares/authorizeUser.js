const asyncHandler = require('./asyncHandler');
const {
  validationError,
  unauthorizedError,
  forbiddenError
} = require('../../domain/errors/AppError');

function createAuthorizeUserMiddleware({ sessionRepository, tokenService, idValidator }) {
  return asyncHandler(async (req, _res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw unauthorizedError('Unauthorized: No bearer token provided');
    }

    const token = authorizationHeader.slice(7);
    const payload = tokenService.verify(token);

    if (!payload || !payload.userId) {
      throw unauthorizedError('Unauthorized: Invalid or expired token');
    }

    const session = await sessionRepository.findValidByToken(token);
    if (!session) {
      throw unauthorizedError('Unauthorized: Invalid or expired session');
    }

    if (!idValidator.isValid(req.params.id)) {
      throw validationError('Invalid user ID format');
    }

    const authenticatedUserId = session.userId;

    if (authenticatedUserId !== req.params.id || authenticatedUserId !== payload.userId) {
      throw forbiddenError("Forbidden: You cannot access other users' data");
    }

    req.authenticatedUserId = authenticatedUserId;
    next();
  });
}

module.exports = createAuthorizeUserMiddleware;
