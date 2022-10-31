import { Request, Response, NextFunction } from 'express';
import { ModuleFunction } from './routingModule';
import ITreeFile from '../interfaces/ITreeFile';
import { getModuleByUrl } from '../core/pathToTreeFile.core';
// import { ServerLog } from '../services/logger.services';

export async function requestHandler(req: Request, res: Response, next: NextFunction) {
  const method = req.method.toLocaleLowerCase();
  const tree: ITreeFile = req.app.get('tree');
  let moduleFunction: ModuleFunction = await import(`../modules/errors/501.${method}`);
  try {
    const { params, pathname } = getModuleByUrl(`${req.params[0]}.${method}.js`, tree);
    req.body = { ...params, ...req.body };
    moduleFunction = await import(`../modules/${pathname.replace(/\.(js|ts)$/, '')}`);
  } catch (err: any) {
    // ServerLog.warn(err.message);
    moduleFunction = await import(`../modules/errors/501.${method}`);
  } finally {
    moduleFunction.default(req, res, next);
  }
}
