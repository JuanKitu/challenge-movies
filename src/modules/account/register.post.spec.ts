import request from 'supertest';
import { accountService } from '../../services/Account.service';
import sequelize from '../../database/database';
import app from '../../app';
import { verifyPassword } from '../../services/crypto.services';
import { createToken } from '../../services/jwt.services';

const api = request(app);

const account = {
  accountName: 'test',
  email: 'test@test.com',
  password: 'test',
};

beforeEach(async () => {
  await sequelize.sync();
  const control = await accountService.findAll();
  if (control && control.length !== 0) {
    await accountService.delete({}, true);
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST register', () => {
  test('returns 201 OK when signup request is valid', (done) => {
    const res = api.post('/api/account/register');
    res.send(account);
    res.then((response) => {
      expect(response.status).toBe(201);
      done();
    });
  });

  test('returns success err when signup request is valid', (done) => {
    const res = api.post('/api/account/register');
    res.send(account);
    res.then((response) => {
      expect(response.body.error).toBe(false);
      done();
    });
  });
  test('save users to database', (done) => {
    const res = api.post('/api/account/register');
    res.send(account);
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'test@test.com',
      });
      expect(queryAccount.length).toBe(1);
      done();
    });
  });
  test('save accountName and email to database', (done) => {
    const res = api.post('/api/account/register');
    res.send(account);
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'test@test.com',
      });
      const newAccount = queryAccount[0];
      expect(newAccount).not.toBe(undefined);
      expect(newAccount.accountName).toBe('test');
      expect(newAccount.email).toBe('test@test.com');
      done();
    });
  });
  test('hashes the password in database', (done) => {
    const res = api.post('/api/account/register');
    res.send(account);
    res.then(async () => {
      const queryAccount = await accountService.findAll({
        email: 'test@test.com',
      });
      const newAccount = queryAccount[0];
      const newHash = await verifyPassword('test', newAccount.salt);
      expect(newAccount.hash).not.toBe('test');
      expect(newAccount.hash).toBe(newHash);
      done();
    });
  });
  test('returns catch when email is undefined', (done) => {
    const res = api.post('/api/account/register');
    res.send({
      accountName: 'test',
      email: undefined,
      password: 'test',
    });
    res.then((response) => {
      expect(response.body.error).toBe(true);
      expect(response.status).toBe(400);
      done();
    });
  });
  test('returns success err when you are singing', (done) => {
    const res = api.post('/api/account/register');
    const token = createToken('token') || '';
    res.set('token', token);
    res.send(account);
    res.then((response) => {
      expect(response.status).toBe(501);
      expect(typeof token).toBe('string');
      expect(response.body.error).toBe(true);
      done();
    });
  });
  test('returns error for duplicate account', (done) => {
    const res2 = api.post('/api/account/register');
    res2.send(account).then(() => {
      const res = api.post('/api/account/register');
      res.send(account);
      res.then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(true);
        done();
      });
    });
  });
});
