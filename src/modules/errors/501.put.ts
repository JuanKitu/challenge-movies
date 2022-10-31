import { Request, Response } from 'express';

export default async function putError(req: Request, res: Response) {
  return res.status(501).send({
    error: true,
    code: 501,
    message: 'PUT not implemented.',
  });
}
