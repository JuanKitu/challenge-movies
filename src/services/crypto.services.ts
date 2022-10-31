import crypto from 'crypto';
import { Encryption } from './crypto';

export function encryptPassword(password: string): Promise<Encryption> {
  const promise = new Promise<Encryption>((resolve, reject) => {
    const salt: string = crypto.randomBytes(128).toString('base64');
    // need new salt to encrypt
    crypto.pbkdf2(password, salt, 100, 64, 'sha512', async (err, derivedKey) => {
      const cifrado: Encryption = {
        hash: derivedKey.toString('hex'),
        salt,
      };
      resolve(cifrado);
      if (err) {
        reject(err);
      }
    });
  });
  return promise;
}
export function verifyPassword(password: string, salt: string): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, derivedKey) => {
      const newHash: string = derivedKey.toString('hex');
      resolve(newHash);
      if (err) {
        reject(err);
      }
    });
  });
  return promise;
}
