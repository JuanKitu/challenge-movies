import { Request, Response } from 'express';
import { verifyToken, createToken } from '../../services/jwt.services';
import { sendSuccess } from '../../core/traffic.core';

export default async function refreshToken(req: Request, res: Response) {
  const getToken = req.get('token');
  const control = verifyToken(getToken);
  const token = createToken(control.decoded.account.toString()) || '';
  res.set('token', [token]);
  return sendSuccess(res, 'token refreshed', { token });
}
