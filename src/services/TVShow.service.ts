// import { ModelCtor } from 'sequelize-typescript';
import TVshow from '../models/TVShows.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class TVShowService extends SequelizeBaseRepository<TVshow> {}
sequelize.addModels([TVshow]);
export const tvShowService = new TVShowService(TVshow);
