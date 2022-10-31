// import { ModelCtor } from 'sequelize-typescript';
import Roles from '../models/Roles.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class RoleService extends SequelizeBaseRepository<Roles> {
  /* constructor(Model:ModelCtor<Roles>) {
    super(Model);
  } */
}
sequelize.addModels([Roles]);
export const roleService = new RoleService(Roles);
