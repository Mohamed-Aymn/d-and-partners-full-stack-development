import { asyncHandler } from './asyncHandler';
import {
  forbiddenError,
  unauthorizedError,
  validationError
} from '../../domain/errors/AppError';
import type {
  IdValidator,
  SessionRepository,
  TokenService
} from '../../persistence/types';

export type AuthorizeUserDeps = {
  sessionRepository: SessionRepository;
  tokenService: TokenService;
  idValidator: IdValidator;
};

export function createAuthorizeUserMiddleware({
  sessionRepository,
  tokenService,
  idValidator
}: AuthorizeUserDeps) {
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

    const resourceUserId = req.params.id as string;

    if (!idValidator.isValid(resourceUserId)) {
      throw validationError('Invalid user ID format');
    }

    const authenticatedUserId = session.userId;

    if (authenticatedUserId !== resourceUserId || authenticatedUserId !== payload.userId) {
      throw forbiddenError("Forbidden: You cannot access other users' data");
    }

    req.authenticatedUserId = authenticatedUserId;
    next();
  });
}
