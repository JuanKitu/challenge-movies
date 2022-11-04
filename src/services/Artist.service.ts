import Artists from '../models/Artists.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class ArtistService extends SequelizeBaseRepository<Artists> {}

sequelize.addModels([Artists]);
export const artistService = new ArtistService(Artists);
