const { isAppError } = require('../../domain/errors/AppError');

const HTTP_STATUS = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404
};

function errorHandler(err, _req, res, _next) {
  if (isAppError(err) && HTTP_STATUS[err.code]) {
    return res.status(HTTP_STATUS[err.code]).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something happened', error: err.message });
}

module.exports = errorHandler;
