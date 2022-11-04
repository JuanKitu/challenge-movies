import { Request, Response } from 'express';
import { artistService } from '../../services/Artist.service';
import { sendError, sendSuccess } from '../../core/traffic.core';

export default async function refreshToken(req: Request, res: Response) {
  const { firstName, lastName, gender, height, birthdate } = req.body;
  try {
    const artist = await artistService.create({
      firstName,
      lastName,
      gender,
      height,
      birthdate,
    });
    return sendSuccess(res, 'ok', artist?.get({ plain: true }));
  } catch (err: any) {
    return sendError(res, 501, err.message);
  }
}
