import request from 'supertest';
import app from '../app';

describe('GET /health', () => {
  it('should return 200 OK with server health information', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'up');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('env');
  });
});

describe('GET /invalid-route-xyz', () => {
  it('should return 404 Not Found for non-existing routes', async () => {
    const res = await request(app).get('/invalid-route-xyz');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});
