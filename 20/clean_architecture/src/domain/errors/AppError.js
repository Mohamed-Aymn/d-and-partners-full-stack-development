function createAppError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function validationError(message) {
  return createAppError(message, 'VALIDATION');
}

function notFoundError(message) {
  return createAppError(message, 'NOT_FOUND');
}

function unauthorizedError(message) {
  return createAppError(message, 'UNAUTHORIZED');
}

function forbiddenError(message) {
  return createAppError(message, 'FORBIDDEN');
}

function isAppError(error) {
  return Boolean(error && error.code);
}

module.exports = {
  createAppError,
  validationError,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  isAppError
};
