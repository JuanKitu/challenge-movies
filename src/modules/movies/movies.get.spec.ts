import { Request, Response } from 'express';
import sequelize from '../../database/database';
import { movieService } from '../../services/Movie.service';
import { artistService } from '../../services/Artist.service';
import moviesModule from './movies.get';

/* const api = request(app); */

afterAll(async () => {
  await sequelize.close();
});

describe('GET movies', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  beforeAll(async () => {
    mockRequest = { query: {} };
    mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await sequelize.sync();
    const control = await movieService.findAll();
    if (control && control.length !== 0) {
      await movieService.delete({}, true);
    }
    const artist = await artistService.create({
      firstName: 'test',
      lastName: 'test2',
      birthdate: new Date('10/10/2020'),
      gender: 'Masculine',
      height: 1.67,
    });
    await movieService.create({
      name: 'test movie',
      budget: '15 millions',
      boxOffice: '100 millions',
      gender: 'drama',
      releaseDate: new Date('10/22/1996'),
      duration: '01:22:00',
      languages: 'English',
      director: artist.artist,
    });
  });

  test('returns OK a simple filter and order valid', async () => {
    mockRequest = { query: { filter: 'movie:1', orderby: 'gender:DESC' } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns OK a simple filter of DATE and order valid', async () => {
    mockRequest = { query: { filter: 'releaseDate:10/22/1995:10/22/1997' } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns OK a simple filter and order invalid', async () => {
    mockRequest = { query: { filter: 'noExist:1', orderby: 'noExist:DESC' } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'SQLITE_ERROR: no such column: Movies.noExist',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns ok a simple filter and order VOID', async () => {
    mockRequest = { query: { filter: 'movie', orderby: 'gender' } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns a complex filter and order valid', async () => {
    mockRequest = { query: { filter: ['movie:1', 'name:te'], orderby: ['gender:DESC', 'movie:ASC'] } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns a complex filter and order VOID', async () => {
    mockRequest = { query: { filter: ['movie', 'name'], orderby: ['gender', 'movie'] } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns a complex filter and order invalid', async () => {
    mockRequest = { query: { filter: ['invalidFiled1:1', 'invalidField2:te'], orderby: ['fieldInvalid1:DESC', 'fieldInvalid2:ASC'] } };
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'SQLITE_ERROR: no such column: Movies.fieldInvalid1',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 201 OK', async () => {
    await moviesModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const releaseDate = new Date('10/22/1996');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        moviesList: [
          {
            actors: [],
            budget: '15 millions',
            director: 1,
            directors: {
              artist: 1,
              birthdate,
              firstName: 'test',
              gender: 'Masculine',
              height: 1.67,
              lastName: 'test2',
            },
            duration: '01:22:00',
            gender: 'drama',
            languages: 'English',
            movie: 1,
            name: 'test movie',
            releaseDate,
          },
        ],
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
});
