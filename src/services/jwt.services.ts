import jwt, { Secret } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';
import path from 'path';
import { TokenDecoded, UserToken } from './jwt';

const baseRouteENV = path.join(__dirname, '..', '..');
dotenv.config({ path: `${baseRouteENV}/config/.env` });

const client = new OAuth2Client(process.env.CLIENT_ID);

export function createToken(account: string) {
  if (process.env.SEED) {
    const secretKey: Secret = process.env.SEED;
    return jwt.sign(
      {
        account,
      },
      secretKey,
      { expiresIn: process.env.EXPIRATION_TOKEN }
    );
  }
  return false;
}

export async function verifyGoogle(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  if (payload) {
    // const userid = payload.sub;
    const user: UserToken = {
      accountName: payload.name,
      emailGoogle: payload.email,
      img: payload.picture,
      google: true,
    };
    return user;
  }
  return false;
}
export function verifyToken(token: string | undefined): TokenDecoded {
  const secretKey = process.env.SEED;
  if (!secretKey) {
    return {
      decoded: null,
      error: true,
      message: 'SEED is undefined',
    };
  }
  if (!token) {
    return {
      decoded: null,
      error: true,
      message: 'Token is undefinded',
    };
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      decoded,
      error: false,
      message: 'Ok',
    };
  } catch (err) {
    return {
      decoded: null,
      error: true,
      message: 'Token is not valid',
    };
  }
}
