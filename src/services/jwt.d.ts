export interface User {
  idUsuario?: number;
  hash: string;
  salt: string;
  nombreUsuario: string;
  email: string;
}

export interface UserToken {
  account?: number;
  accountName?: string;
  emailGoogle?: string;
  img?: string;
  google?: boolean;
}
export interface TokenDecoded {
  decoded: any;
  error: boolean;
  message: string;
}
