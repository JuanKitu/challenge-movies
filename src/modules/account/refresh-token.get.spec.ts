import request from 'supertest';
import app from '../../app';
import { createToken } from '../../services/jwt.services';

const api = request(app);

describe('GET Refresh-Token', () => {
  test('returns 500 when token is not valid', (done) => {
    const res = api.get('/api/account/refresh-token');
    const token = 'error';
    res.set('token', token);
    res.send();
    res.then((response) => {
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      done();
    });
  });
  test('returns success err when signup request is valid', (done) => {
    const res = api.get('/api/account/refresh-token');
    const token = createToken('token') || '';
    res.set('token', token);
    res.send();
    res.then((response) => {
      expect(response.status).toBe(201);
      expect(typeof token).toBe('string');
      expect(response.body.error).toBe(false);
      done();
    });
  });
});
