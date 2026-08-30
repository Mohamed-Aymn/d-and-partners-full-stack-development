import type { Request, Response } from 'express';
import { notFoundError } from '../../errors/AppError';
import { toSafeUser, toUserRecord, USERS_COLLECTION } from '../../models/user';
import type { UserControllerDeps } from './types';

export function getUserController({ repository }: UserControllerDeps) {
  return async function getUser(req: Request, res: Response) {
    const user = toUserRecord(
      await repository.findById(USERS_COLLECTION, req.params.id as string)
    );
    if (!user) {
      throw notFoundError('User not found');
    }

    res.json(toSafeUser(user));
  };
}
