// import { ModelCtor } from 'sequelize-typescript';
import Permissions from '../models/Permissions.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class PermissionService extends SequelizeBaseRepository<Permissions> {
  /* constructor(Model:ModelCtor<Permissions>) {
    super(Model);
  } */
}
sequelize.addModels([Permissions]);
export const permissionService = new PermissionService(Permissions);
