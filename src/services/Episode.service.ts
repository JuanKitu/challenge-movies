import SequelizeBaseRepository from '../core/repository.core';
import Episodes from '../models/Episodes.model';
import sequelize from '../database/database';

class EpisodeService extends SequelizeBaseRepository<Episodes> {}
sequelize.addModels([Episodes]);
export const episodeService = new EpisodeService(Episodes);
