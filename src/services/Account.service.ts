// import { ModelCtor } from 'sequelize-typescript';
import Accounts from '../models/Accounts.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class AccountService extends SequelizeBaseRepository<Accounts> {
  /* constructor(Model:ModelCtor<Accounts>) {
    super(Model);
  } */
}
sequelize.addModels([Accounts]);
export const accountService = new AccountService(Accounts);
