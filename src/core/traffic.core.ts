import { Response } from 'express';
import { bodyResponse } from '../interfaces/bodyResponse';

export function sendError(res: Response, code: number = 500, message: string = 'Something went wrong') {
  const body: bodyResponse = { error: true, code, message };
  try {
    res.status(code).send(body);
    // @ts-ignore
  } catch (ex: any) {
    // logger.error(ex.message);
  }
}
export function sendSuccess(res: Response, message: string, payload: any, raw: any = null) {
  const body: bodyResponse = { error: false, code: 201, message, payload };
  try {
    res.status(201).send(raw || body);
    // @ts-ignore
  } catch (ex: any) {
    // logger.error(ex.message);
  }
}
