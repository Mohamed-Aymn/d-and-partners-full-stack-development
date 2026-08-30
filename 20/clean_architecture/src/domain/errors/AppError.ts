export type AppErrorCode = 'VALIDATION' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN';

export type AppError = Error & {
  code: AppErrorCode;
};

function createAppError(message: string, code: AppErrorCode): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  return error;
}

export function validationError(message: string): AppError {
  return createAppError(message, 'VALIDATION');
}

export function notFoundError(message: string): AppError {
  return createAppError(message, 'NOT_FOUND');
}

export function unauthorizedError(message: string): AppError {
  return createAppError(message, 'UNAUTHORIZED');
}

export function forbiddenError(message: string): AppError {
  return createAppError(message, 'FORBIDDEN');
}

export function isAppError(error: unknown): error is AppError {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error
  );
}
