import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../modules/users/user.model';

describe('Phase 04 Authentication & Authorization Integration Tests', () => {
  const testUser = {
    email: 'user@test.com',
    password: 'Password123!',
    name: 'Standard User',
  };

  const testAdmin = {
    email: 'admin@test.com',
    password: 'Password123!',
    name: 'Admin User',
  };

  beforeAll(async () => {
    await connectDatabase();
    // Ensure clean state
    await User.deleteMany({ email: { $in: [testUser.email, testAdmin.email] } });
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection('sessions').deleteMany({});
      await mongoose.connection.db.collection('accounts').deleteMany({});
    }
  });

  afterAll(async () => {
    // Cleanup database
    await User.deleteMany({ email: { $in: [testUser.email, testAdmin.email] } });
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection('sessions').deleteMany({});
      await mongoose.connection.db.collection('accounts').deleteMany({});
    }
    await disconnectDatabase();
  });

  describe('Registration & Role Enforcement', () => {
    it('should register a new user with standard USER role', async () => {
      const res = await request(app).post('/api/auth/sign-up/email').send(testUser);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', testUser.email);
      expect(res.body.user).toHaveProperty('role', 'USER');

      // Verify in DB
      const dbUser = await User.findOne({ email: testUser.email });
      expect(dbUser).toBeDefined();
      expect(dbUser?.role).toBe('USER');
    });

    it('should ignore role elevations in signup payload and still register as USER', async () => {
      const res = await request(app)
        .post('/api/auth/sign-up/email')
        .send({
          ...testAdmin,
          role: 'ADMIN', // Try to elevate role
        });

      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty('role', 'USER');

      // Verify in DB
      const dbUser = await User.findOne({ email: testAdmin.email });
      expect(dbUser).toBeDefined();
      expect(dbUser?.role).toBe('USER');
    });
  });

  describe('Login & Session Management', () => {
    let userCookie: string;

    it('should successfully log in and return session details and set-cookie', async () => {
      const res = await request(app).post('/api/auth/sign-in/email').send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.headers['set-cookie']).toBeDefined();

      userCookie = res.headers['set-cookie'][0];
    });

    it('should retrieve current user profile using session cookie', async () => {
      const res = await request(app).get('/api/users/me').set('Cookie', userCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('email', testUser.email);
      expect(res.body.data).toHaveProperty('role', 'USER');
    });

    it('should reject unauthenticated profile retrieval', async () => {
      const res = await request(app).get('/api/users/me');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Unauthorized');
    });
  });

  describe('Role-Based Access Control', () => {
    let userCookie: string;
    let adminCookie: string;

    beforeAll(async () => {
      // Elevate admin user role in database directly
      await User.updateOne({ email: testAdmin.email }, { role: 'ADMIN' });

      // Get standard user session cookie
      const resUser = await request(app).post('/api/auth/sign-in/email').send({
        email: testUser.email,
        password: testUser.password,
      });
      userCookie = resUser.headers['set-cookie'][0];

      // Get admin user session cookie
      const resAdmin = await request(app).post('/api/auth/sign-in/email').send({
        email: testAdmin.email,
        password: testAdmin.password,
      });
      adminCookie = resAdmin.headers['set-cookie'][0];
    });

    it('should forbid standard USER from accessing ADMIN endpoint', async () => {
      const res = await request(app).get('/api/users/test-admin').set('Cookie', userCookie);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Forbidden');
    });

    it('should permit ADMIN to access ADMIN endpoint', async () => {
      const res = await request(app).get('/api/users/test-admin').set('Cookie', adminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Admin content');
    });
  });
});
