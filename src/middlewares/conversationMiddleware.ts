import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import {
  getConvsersationById,
  userConversationExists,
} from '../repositories/conversationRepository';
import { User } from '@prisma/client';

/***
 * Middleware used to check if conversation exists given conversation ID
 */
export const conversationExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    const conversation = await getConvsersationById(id);
    if (!conversation) {
      return next(new AppError('Conversation does not exist', 404));
    }
    next();
  },
);

/***
 * Middleware used to check if user is member in a given conversation given user & conversation ID
 */
export const userInConversation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.user as User;
    const conversation = await userConversationExists(user.id, id);
    if (!conversation) {
      return res.status(401).json({ message: 'User is not in conversation' });
    }
    return next();
  },
);
