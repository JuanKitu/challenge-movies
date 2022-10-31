import { Request, Response, NextFunction } from 'express';
import { permissionService } from '../services/Permission.service';
import { accountRoleService } from '../services/AccountRole.service';
import { petitionService } from '../services/Petition.service';
import ITreeFile from '../interfaces/ITreeFile';
import { getModuleByUrl } from '../core/pathToTreeFile.core';
import { sendError } from '../core/traffic.core';

export async function rolesMiddleware(req: Request, res: Response, next: NextFunction) {
  const publicRoutes = new Set(['account/login', 'account/register', 'account/loginGoogle']);
  if (publicRoutes.has(req.params[0])) {
    return next();
  }
  const { account } = res.locals;
  if (!account) {
    return sendError(res, 500, 'user is not login');
  }
  try {
    const queryRoles = await accountRoleService.findAll({
      account,
    });
    if (!queryRoles.length) {
      return sendError(res, 500, 'rol is not exist');
    }
    const roleList = queryRoles.map((rol) => rol.role);
    /* added feat tree routes */
    const tree: ITreeFile = req.app.get('tree');
    const method = req.method.toLocaleLowerCase();
    const archive = `${req.params[0]}.${method}.js`;
    const url = getModuleByUrl(archive, tree)
      .pathname.replace(/\.(\w+).(js|ts)$/, '')
      .replace(/\[/g, '\\[')
      .replace(/]/g, '\\]');
    /* ###################### */
    const permissionQuery = await permissionService.findAll({
      role: roleList,
      routeName: url,
    });
    const permissionList = permissionQuery.map((permission: any) => {
      return permission.permission;
    });
    const queryPetition = await petitionService.findAll({
      permission: permissionList,
    });
    const arrayPetition = queryPetition.map((petition) => petition.petitionName);
    if (arrayPetition.includes('all')) {
      return next();
    }
    if (arrayPetition.includes(req.method.toLocaleLowerCase())) {
      return next();
    }
    return sendError(res, 500, "Don't have permissions");
  } catch (err: any) {
    return res.status(500).json({
      err,
      message: 'error in the try catch roles middleware',
    });
  }
}
