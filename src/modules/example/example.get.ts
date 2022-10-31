import { Request, Response } from 'express';
import { sendSuccess } from '../../core/traffic.core';

export default async function example1(req: Request, res: Response) {
  const { id } = req.params;
  return sendSuccess(res, 'ok', { message: 'hi', id });
}
