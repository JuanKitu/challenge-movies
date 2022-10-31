import { Request, Response } from 'express';

export default async function subExample1(req: Request, res: Response) {
  return res.status(200).send({
    error: false,
    code: 200,
    message: 'hi',
  });
}
