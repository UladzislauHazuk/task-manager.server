import { ExceptionType } from './exceptions.type';
import { Request, Response, NextFunction } from 'express';

const isValidUserId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) throw new Error(ExceptionType.USER_ID_INVALID.message);
  next();
};

const isValidUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, surname } = req.body;
  if (!name) throw new Error(ExceptionType.USER_NAME_INVALID.message);
  if (!surname) throw new Error(ExceptionType.USER_SURNAME_INVALID.message);
  next();
};

const isValidEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!/^[0-9a-z]+\.[0-9a-z]+@[a-z]+\.[a-z]{1,3}$/g.test(email)) throw new Error(ExceptionType.USER_EMAIL_INVALID.message);
  next();
};

export { isValidUserId, isValidUser, isValidEmail };
