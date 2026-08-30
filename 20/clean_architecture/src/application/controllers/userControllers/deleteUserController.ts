import type { Request, Response } from 'express';
import { notFoundError } from '../../errors/AppError';
import { USERS_COLLECTION } from '../../models/user';
import { SESSIONS_COLLECTION } from '../../models/session';
import type { UserControllerDeps } from './types';

export function deleteUserController({ repository }: UserControllerDeps) {
  return async function deleteUser(req: Request, res: Response) {
    const id = req.params.id as string;
    const deleted = await repository.deleteById(USERS_COLLECTION, id);
    if (!deleted) {
      throw notFoundError('User not found');
    }

    await repository.deleteMany(SESSIONS_COLLECTION, { userId: id });
    res.status(200).json({ message: 'User deleted successfully' });
  };
}
