import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sendError, sendSuccess } from '../../core/traffic.core';
import { movieService } from '../../services/Movie.service';
import Artists from '../../models/Artists.model';
import { MoviesI } from '../../interfaces/movie';

export default async function movies(req: Request, res: Response) {
  try {
    // @ts-ignore
    const getFilter: string | string[] = req.query.filter;
    // @ts-ignore
    const getOrderly: string | string[] = req.query.orderby;
    const createOrders = function createOrders(order: string | string[]) {
      if (!order) return [];
      const controlOrder = ['DESC', 'ASC'];
      if (typeof order === 'string') {
        const newOrder: string[] = order.split(':');
        if (newOrder.length === 2 && controlOrder.includes(newOrder[1].toUpperCase())) {
          return [newOrder];
        }
        return [];
      }
      const arrayResult: any = [];
      order.forEach((element) => {
        const newOrder: string[] = element.split(':');
        if (newOrder.length === 2 && controlOrder.includes(newOrder[1].toUpperCase())) {
          arrayResult.push(newOrder);
        }
      });
      return arrayResult;
    };
    const createFilters = function createFilters(filter: string | string[]) {
      const options = {};
      const controlFilter: MoviesI = {
        movie: -1,
        name: '',
        budget: '',
        boxOffice: '',
        gender: '',
        releaseDate: new Date(),
        duration: '',
        languages: '',
        director: -1,
      };

      function filterField(field: string) {
        const newFilter = field.split(':');
        if (newFilter.length < 2) return [];
        const keysOfMovies = Object.keys(controlFilter);
        const key = keysOfMovies.find((keyMovie: string) => keyMovie === newFilter[0]);
        if (!key) return [];
        // @ts-ignore
        if (typeof controlFilter[key] === 'string') {
          // @ts-ignore
          return process.env.NODE_ENV === 'test' ? [key, { [Op.like]: `%${newFilter[1]}%` }] : [key, { [Op.iLike]: `%${newFilter[1]}%` }];
        }
        // @ts-ignore
        if (typeof controlFilter[key] === 'number') {
          // @ts-ignore
          const [, ...rest] = newFilter;
          // @ts-ignore
          return [key, rest];
        }
        // @ts-ignore
        if (controlFilter[key] instanceof Date) {
          const [, ...rest] = newFilter;
          // @ts-ignore
          return [key, { [Op.between]: rest }];
        }
        return [];
      }

      if (typeof filter === 'string') {
        const fields = filterField(filter);
        if (fields.length) {
          // @ts-ignore
          // eslint-disable-next-line prefer-destructuring
          options[fields[0]] = fields[1];
        }
      }
      if (Array.isArray(filter)) {
        filter.forEach((elementField: string) => {
          const fields = filterField(elementField);
          if (fields.length) {
            // @ts-ignore
            // eslint-disable-next-line prefer-destructuring
            options[fields[0]] = fields[1];
          }
        });
      }
      return options;
    };
    const order = createOrders(getOrderly);
    const options = createFilters(getFilter);
    const include = [
      {
        model: Artists,
        as: 'directors',
      },
      {
        model: Artists,
        as: 'actors',
      },
    ];
    const moviesList = await movieService.findAll(options, undefined, include, order);
    return sendSuccess(res, 'ok', { moviesList: moviesList.map((movie) => movie.get({ plain: true })) });
  } catch (err: any) {
    return sendError(res, 501, err.message);
  }
}
