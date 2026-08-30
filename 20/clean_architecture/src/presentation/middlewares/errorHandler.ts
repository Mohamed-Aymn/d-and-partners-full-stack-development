import type { NextFunction, Request, Response } from 'express';
import { isAppError, type AppErrorCode } from '../../application/errors/AppError';

const HTTP_STATUS: Record<AppErrorCode, number> = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404
};

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (isAppError(err) && HTTP_STATUS[err.code]) {
    return res.status(HTTP_STATUS[err.code]).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something happened', error: err.message });
}
