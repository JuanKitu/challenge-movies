import Season from '../models/Seasons.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class SeasonService extends SequelizeBaseRepository<Season> {}
sequelize.addModels([Season]);
export const seasonService = new SeasonService(Season);
