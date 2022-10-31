import { Request, Response } from 'express';

export default async function petitionError(req: Request, res: Response) {
  return res.status(501).send({
    error: true,
    code: 501,
    message: 'Not implemented.',
  });
}
