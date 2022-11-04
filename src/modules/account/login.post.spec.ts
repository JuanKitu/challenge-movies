import request from 'supertest';
import { accountService } from '../../services/Account.service';
import sequelize from '../../database/database';
import app from '../../app';
import { createToken } from '../../services/jwt.services';

const api = request(app);

const account = {
  accountName: 'test',
  email: 'test@test.com',
  password: 'test',
};

beforeAll(async () => {
  await sequelize.sync();
  const control = await accountService.findAll();
  if (control && control.length !== 0) {
    await accountService.delete({}, true);
  }
  const res = api.post('/api/account/register');
  await res.send(account);
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST Login', () => {
  test('returns 201 OK when signup request is valid', (done) => {
    const res = api.post('/api/account/login');
    res.send(account);
    res.then((response) => {
      expect(response.status).toBe(201);
      done();
    });
  });

  /* test('returns success err when signup request is valid', (done) => {
    const res = api.post('/api/account/login');
    res.send(account);
    res.then((response) => {
      expect(response.body.error).toBe(false);
      done();
    });
  }); */
  test('returns err and error username when email is not valid', (done) => {
    const res = api.post('/api/account/login');
    res.send({
      accountName: 'test',
      email: 'userIncorrect@test.com',
      password: 'test',
    });
    res.then((response) => {
      expect(response.body.error).toBe(true);
      expect(response.status).toBe(505);
      done();
    });
  });
  test('returns err and error username when password is not valid', (done) => {
    const res = api.post('/api/account/login');
    res.send({
      accountName: 'test',
      email: 'test@test.com',
      password: 'incorrect',
    });
    res.then((response) => {
      expect(response.body.error).toBe(true);
      expect(response.status).toBe(505);
      done();
    });
  });
  test('returns catch when email is undefined', (done) => {
    const res = api.post('/api/account/login');
    res.send({
      accountName: 'test',
      email: undefined,
      password: 'test',
    });
    res.then((response) => {
      expect(response.body.error).toBe(true);
      expect(response.status).toBe(501);
      done();
    });
  });
  /* test('returns success err when you are singing', (done) => {
    const res = api.post('/api/account/login');
    const token = createToken('token') || '';
    res.set('token', token);
    res.send(account);
    res.then((response) => {
      expect(response.status).toBe(500);
      expect(typeof token).toBe('string');
      expect(response.body.error).toBe(true);
      done();
    });
  }); */
});
