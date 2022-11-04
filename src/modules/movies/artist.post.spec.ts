import { Request, Response } from 'express';
import sequelize from '../../database/database';
import { artistService } from '../../services/Artist.service';
import artistModule from './artist.post';

/* const api = request(app); */

afterAll(async () => {
  await sequelize.close();
});

describe('GET movies', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  beforeAll(async () => {
    mockRequest = { body: {} };
    mockResponse = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await sequelize.sync();
    const control = await artistService.findAll();
    if (control && control.length !== 0) {
      await artistService.delete({}, true);
    }
  });

  test('returns 201 OK', async () => {
    mockRequest = {
      body: {
        firstName: 'test',
        lastName: 'test1',
        gender: 'Masculine',
        height: 1.56,
        birthdate: '2000/10/22',
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const birthdate = new Date('2000/10/22');
    const expectedResponse = {
      code: 201,
      error: false,
      message: 'ok',
      payload: {
        artist: 1,
        birthdate,
        firstName: 'test',
        gender: 'Masculine',
        height: 1.56,
        lastName: 'test1',
      },
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for firstName UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: undefined,
        lastName: 'test1',
        gender: 'Masculine',
        height: 1.56,
        birthdate: '2000/10/22',
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'notNull Violation: Artists.firstName cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for lastName UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: 'test',
        lastName: undefined,
        gender: 'Masculine',
        height: 1.56,
        birthdate: '2000/10/22',
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'notNull Violation: Artists.lastName cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for gender UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: 'test',
        lastName: 'test1',
        gender: undefined,
        height: 1.56,
        birthdate: '2000/10/22',
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'notNull Violation: Artists.gender cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for height UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: 'test',
        lastName: 'test1',
        gender: 'Masculine',
        height: undefined,
        birthdate: '2000/10/22',
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'notNull Violation: Artists.height cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for birthdate UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: 'test',
        lastName: 'test1',
        gender: 'Masculine',
        height: 1.56,
        birthdate: undefined,
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message: 'notNull Violation: Artists.birthdate cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
  test('returns 501 for all fields UNDEFINED', async () => {
    mockRequest = {
      body: {
        firstName: undefined,
        lastName: undefined,
        gender: undefined,
        height: undefined,
        birthdate: undefined,
      },
    };
    await artistModule(mockRequest as Request, mockResponse as Response);
    const expectedResponse = {
      code: 501,
      error: true,
      message:
        'notNull Violation: Artists.firstName cannot be null,\n' +
        'notNull Violation: Artists.lastName cannot be null,\n' +
        'notNull Violation: Artists.gender cannot be null,\n' +
        'notNull Violation: Artists.birthdate cannot be null,\n' +
        'notNull Violation: Artists.height cannot be null',
    };
    expect(mockResponse.send).toBeCalledWith(expectedResponse);
  });
});
