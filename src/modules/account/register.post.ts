import { Request, Response } from 'express';
import { AccountsI } from '../../interfaces/account';
import { accountService } from '../../services/Account.service';
import { Encryption } from '../../services/crypto';
import { encryptPassword } from '../../services/crypto.services';
import { verifyToken } from '../../services/jwt.services';
import { sendError, sendSuccess } from '../../core/traffic.core';
import registerMiddleware from '../../middleware/register.middleware';
// import { accountService } from '../../services/Account.service';

async function postRegister(req: Request, res: Response) {
  try {
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
    const responseAccount = await accountService.create(newAccount);
    if (!responseAccount) {
      return sendError(res, 501, 'error in create account');
    }
    if (!responseAccount.account) {
      return sendError(res, 501, 'error in create account id is undefined');
    }
    return sendSuccess(res, 'Account created', {});
  } catch (err: any) {
    return sendError(res, 501, err.message);
  }
}
export default async function route(req: Request, res: Response) {
  await registerMiddleware(req, res, () => postRegister(req, res));
}
