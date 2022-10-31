import { Request, Response } from 'express';
import { accountService } from '../../services/Account.service';
import { UserToken } from '../../services/jwt';
import { createToken, verifyGoogle, verifyToken } from '../../services/jwt.services';

// eslint-disable-next-line func-names
const sendToken = async function (account: number | undefined, res: Response) {
  if (!account) {
    return res.status(505).json({
      message: 'account number is undefined',
      error: true,
    });
  }
  const newToken = createToken(account.toString());
  if (!newToken) {
    return res.status(505).json({
      message: 'token creation error',
      error: true,
    });
  }
  res.set('token', [newToken]);
  return res.status(200).json({
    token: newToken,
    error: false,
  });
};
export default async function postLoginGoogle(req: Request, res: Response) {
  const getToken = req.get('token');
  const control = verifyToken(getToken);
  if (!control.error) {
    return res.status(500).json({
      message: 'you are login',
      error: true,
    });
  }
  const token = req.get('googleToken');
  try {
    if (!token) {
      return res.status(505).json({
        message: 'token is undefined',
        error: true,
      });
    }
    const googleUser: UserToken | false = await verifyGoogle(token);
    if (!googleUser) {
      return res.status(505).json({
        message: 'google login is wrong',
        error: true,
      });
    }
    if (!googleUser.emailGoogle || !googleUser.accountName) {
      return res.status(505).json({
        message: 'email or account name not exist',
        error: true,
      });
    }
    const findAccount = await accountService.findOne({ emailGoogle: googleUser.emailGoogle });
    // is new user
    if (!findAccount) {
      const newAccount = await accountService.create({
        accountName: googleUser.accountName,
        emailGoogle: googleUser.emailGoogle,
      });
      if (!newAccount) {
        return res.status(505).json({
          message: 'new account is wrong',
          error: true,
        });
      }
      return await sendToken(newAccount.account, res);
    }
    return await sendToken(findAccount.account, res);
  } catch (err) {
    return res.status(501).json({
      message: err,
      error: true,
    });
  }
}
