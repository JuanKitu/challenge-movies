import { NextFunction, Response, Request } from 'express';
import { accountService } from '../services/Account.service';
import { sendError } from '../core/traffic.core';

export default async function registerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { password, accountName, email } = req.body;
  // check if send accountName
  if (!accountName) return sendError(res, 400, 'accountName is undefined');
  // check if send password
  if (!password) return sendError(res, 400, 'password is undefined');
  // check if send email
  if (!email) return sendError(res, 400, 'email is undefined');
  // check if accountName already exist
  // @ts-ignore
  const account = await accountService.findOne({ accountName });
  if (account) return sendError(res, 400, 'accountName already exist');

  return next();
}
