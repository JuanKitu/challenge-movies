// import { ModelCtor } from 'sequelize-typescript';
import Petitions from '../models/Petitions.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class PetitionService extends SequelizeBaseRepository<Petitions> {
  /* constructor(Model:ModelCtor<Petitions>) {
    super(Model);
  } */
}
sequelize.addModels([Petitions]);
export const petitionService = new PetitionService(Petitions);
