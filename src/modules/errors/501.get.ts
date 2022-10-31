import { Request, Response } from 'express';

export default async function getError(req: Request, res: Response) {
  return res.status(501).send({
    error: true,
    code: 501,
    message: 'GET not implemented.',
  });
}
