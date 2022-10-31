import AccountRole from '../models/AccountRoles.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class AccountRoleService extends SequelizeBaseRepository<AccountRole> {}
sequelize.addModels([AccountRole]);
export const accountRoleService = new AccountRoleService(AccountRole);
