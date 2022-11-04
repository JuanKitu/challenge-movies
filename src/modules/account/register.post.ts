import { Request, Response } from 'express';
import { AccountsI } from '../../interfaces/account';
import { accountService } from '../../services/Account.service';
import { Encryption } from '../../services/crypto';
import { encryptPassword } from '../../services/crypto.services';
import { verifyToken } from '../../services/jwt.services';
import { sendError, sendSuccess } from '../../core/traffic.core';
import registerMiddleware from '../../middleware/register.middleware';

async function postRegister(req: Request, res: Response) {
  const getToken = req.get('token');
  const control = verifyToken(getToken);
  if (!control.error) {
    return sendError(res, 501, 'you are login');
  }
  const { password, accountName, email } = req.body;
  const newEncrypt: Encryption = await encryptPassword(password);
  const newAccount: AccountsI = {
    hash: newEncrypt.hash,
    salt: newEncrypt.salt,
    email,
    accountName,
  };
  await accountService.create(newAccount);
  return sendSuccess(res, 'Account created', {});
}
export default async function route(req: Request, res: Response) {
  await registerMiddleware(req, res, () => postRegister(req, res));
}
