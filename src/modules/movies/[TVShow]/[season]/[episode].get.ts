import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../../../../core/traffic.core';
import { episodeService } from '../../../../services/Episode.service';
import Artists from '../../../../models/Artists.model';

export default async function refreshToken(req: Request, res: Response) {
  const { season, episode, TVShow } = req.body;
  try {
    const include = [
      {
        model: Artists,
        as: 'directors',
      },
    ];
    const getEpisode = await episodeService.findOne(
      {
        season,
        episode,
        TVShow,
      },
      undefined,
      include
    );
    return sendSuccess(res, 'ok', getEpisode?.get({ plain: true }));
  } catch (err: any) {
    return sendError(res, 501, err.message);
  }
}
