import { Request, Response } from 'express';
import { accountService } from '../../services/Account.service';
import { accountLogin } from './accountLogin';
import { verifyPassword } from '../../services/crypto.services';
import { createToken, verifyToken } from '../../services/jwt.services';
import { sendError, sendSuccess } from '../../core/traffic.core';
import loginMiddleware from '../../middleware/login.middleware';

async function postLogin(req: Request, res: Response) {
  const account: accountLogin = { password: req.body.password, email: req.body.email, accountName: req.body.accountName };
  try {
    const getToken = req.get('token');
    const control = verifyToken(getToken);
    if (!control.error) {
      return res.status(500).json({
        message: 'you are login',
        error: true,
      });
    }
    if (!account.password) return sendError(res, 400, 'password is undefined');
    const selectAccount = await accountService.findOne(
      {
        email: account.email,
      },
      ['hash', 'salt', 'account']
    );
    if (!selectAccount) {
      return sendError(res, 505, 'account not exist');
    }
    if (!selectAccount.account) {
      return sendError(res, 505, 'account not exist');
    }
    const newHash = await verifyPassword(account.password, selectAccount.salt);
    if (newHash !== selectAccount.hash) {
      return sendError(res, 505, 'password is wrong');
    }
    const token = createToken(selectAccount.account.toString());
    if (!token) {
      return sendError(res, 505, 'token creation error');
    }
    res.set('token', [token]);
    return sendSuccess(res, 'login successful', { token });
  } catch (err: any) {
    return sendError(res, 501, err.message);
  }
}
export default function route(req: Request, res: Response) {
  loginMiddleware(req, res, () => postLogin(req, res));
}
