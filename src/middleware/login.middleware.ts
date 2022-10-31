import { NextFunction, Response, Request } from 'express';
import { sendError } from '../core/traffic.core';

export default function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { password, accountName } = req.body;
  // check if send password and accountName
  if (!accountName) return sendError(res, 400, 'accountName is undefined');
  // login...
  if (!password) return sendError(res, 400, 'password is undefined');
  return next();
}
