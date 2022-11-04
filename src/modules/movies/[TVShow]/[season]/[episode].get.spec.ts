import { Request, Response } from 'express';
import episodeModule from './[episode].get';
import sequelize from '../../../../database/database';
import { episodeService } from '../../../../services/Episode.service';
import { artistService } from '../../../../services/Artist.service';
import { tvShowService } from '../../../../services/TVShow.service';
import { seasonService } from '../../../../services/Season.service';

/* const api = request(app); */

afterAll(async () => {
  await sequelize.close();
});

describe('GET movies', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  beforeEach(async () => {
    mockRequest = {};
    mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await sequelize.sync();
    const control = await episodeService.findAll();
    if (control && control.length !== 0) {
      await episodeService.delete({}, true);
    }
    const artist = await artistService.create({
      firstName: 'test',
      lastName: 'test2',
      birthdate: new Date('10/10/2020'),
      gender: 'Masculine',
      height: 1.67,
    });
    const show = await tvShowService.create({
      name: 'test movie',
      gender: 'drama',
      releaseDate: new Date('10/22/1996'),
      languages: 'English',
      director: artist.artist,
    });
    const season = await seasonService.create({
      TVShow: show.TVShow,
      name: 'test1',
      description: 'test desc',
    });
    await episodeService.create({
      TVShow: show.TVShow,
      season: season.season,
      number: 21,
      name: 'test movie',
      description: 'test',
      director: artist.artist,
    });
  });

  test('Returns OK', async () => {
    mockRequest = { body: { season: 1, episode: 1, TVShow: 1 } };
    await episodeModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('10/10/2020');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        TVShow: 1,
        description: 'test',
        director: 1,
        directors: {
          artist: 1,
          birthdate,
          firstName: 'test',
          gender: 'Masculine',
          height: 1.67,
          lastName: 'test2',
        },
        episode: 1,
        name: 'test movie',
        number: 21,
        season: 1,
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('Return OK and payload UNDEFINED for missing keys', async () => {
    mockRequest = { body: { season: 51, episode: 71, TVShow: 91 } };
    await episodeModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: undefined,
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('Return Error 501 for keys undefined', async () => {
    mockRequest = { body: { season: undefined, episode: undefined, TVShow: undefined } };
    await episodeModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'WHERE parameter "season" has invalid "undefined" value',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
});
