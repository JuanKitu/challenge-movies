import { Request, Response } from 'express';

export default async function postError(req: Request, res: Response) {
  return res.status(501).send({
    error: true,
    code: 501,
    message: 'POST not implemented.',
  });
}
