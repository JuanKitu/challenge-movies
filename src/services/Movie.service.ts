import Movies from '../models/Movies.model';
import SequelizeBaseRepository from '../core/repository.core';
import sequelize from '../database/database';

class MovieService extends SequelizeBaseRepository<Movies> {}

sequelize.addModels([Movies]);
export const movieService = new MovieService(Movies);
