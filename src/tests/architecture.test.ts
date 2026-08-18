import request from 'supertest';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { AppError } from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { calculatePagination } from '../utils/calculatePagination';
import { sendResponse } from '../utils/sendResponse';
import { validateRequest } from '../middlewares/validateRequest';
import { errorHandler } from '../middlewares/errorHandler';

describe('Phase 03 Common Backend Architecture Tests', () => {
  // 1. AppError Unit Tests
  describe('AppError Unit Tests', () => {
    it('should correctly set statusCode, message, isOperational, and metadata', () => {
      const metadata = { details: 'test metadata' };
      const err = new AppError(400, 'Bad Request Test', metadata);

      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Bad Request Test');
      expect(err.isOperational).toBe(true);
      expect(err.metadata).toEqual(metadata);
      expect(err.stack).toBeDefined();
    });
  });

  // 2. Pagination Helper Unit Tests
  describe('calculatePagination Unit Tests', () => {
    it('should calculate default pagination options when inputs are missing or invalid', () => {
      const result = calculatePagination({});
      expect(result).toEqual({
        page: 1,
        limit: 10,
        skip: 0,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
    });

    it('should correctly parse pagination options', () => {
      const result = calculatePagination({
        page: '3',
        limit: '5',
        sortBy: 'name',
        sortOrder: 'asc',
      });
      expect(result).toEqual({
        page: 3,
        limit: 5,
        skip: 10,
        sortBy: 'name',
        sortOrder: 'asc',
      });
    });

    it('should ensure page and limit are at least 1', () => {
      const result = calculatePagination({
        page: -5,
        limit: 0,
      });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(1);
      expect(result.skip).toBe(0);
    });
  });

  // 3. Integration Tests with Test App
  describe('Integration & Middleware Tests', () => {
    let testApp: express.Express;

    beforeAll(() => {
      testApp = express();
      testApp.use(express.json());

      // Success endpoint to test sendResponse
      testApp.get(
        '/test/success',
        catchAsync(async (req: Request, res: Response) => {
          sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Success',
            meta: {
              page: 1,
              limit: 10,
              total: 100,
              totalPages: 10,
            },
            data: { test: 'data' },
          });
        })
      );

      // Async Error endpoint to test catchAsync
      testApp.get(
        '/test/async-error',
        catchAsync(async () => {
          throw new AppError(403, 'Forbidden test');
        })
      );

      // Sync Error endpoint
      testApp.get(
        '/test/sync-error',
        catchAsync(() => {
          throw new Error('Generic test error');
        })
      );

      // Mongoose CastError endpoint
      testApp.get(
        '/test/cast-error',
        catchAsync(() => {
          const castError = new mongoose.Error.CastError('ObjectId', 'invalid-id', 'id');
          throw castError;
        })
      );
      // MongoDB DuplicateKeyError endpoint
      testApp.get(
        '/test/duplicate-error',
        catchAsync(() => {
          const duplicateError = new Error('E11000 duplicate key error collection') as Error & {
            code?: number;
            keyValue?: Record<string, string>;
          };
          duplicateError.code = 11000;
          duplicateError.keyValue = { email: 'test@example.com' };
          throw duplicateError;
        })
      );

      const testSchema = z.object({
        body: z.object({
          username: z.string().min(3),
          email: z.string().email(),
        }),
      });

      // Validation endpoint to test validateRequest
      testApp.post('/test/validate', validateRequest(testSchema), (req: Request, res: Response) => {
        res.status(200).json({ success: true, body: req.body });
      });

      // Wire global errorHandler
      testApp.use(errorHandler);
    });

    it('should format successful responses correctly using sendResponse', async () => {
      const res = await request(testApp).get('/test/success');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        message: 'Success',
        meta: {
          page: 1,
          limit: 10,
          total: 100,
          totalPages: 10,
        },
        data: { test: 'data' },
      });
    });

    it('should catch async AppErrors and format through global handler', async () => {
      const res = await request(testApp).get('/test/async-error');
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(403);
      expect(res.body.message).toBe('Forbidden test');
      expect(res.body.errorMessages).toEqual([{ path: '', message: 'Forbidden test' }]);
    });

    it('should handle Mongoose CastError and format correctly', async () => {
      const res = await request(testApp).get('/test/cast-error');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid ID');
      expect(res.body.errorMessages).toEqual([{ path: 'id', message: 'Invalid value for id' }]);
    });

    it('should handle MongoDB DuplicateKeyError and format correctly', async () => {
      const res = await request(testApp).get('/test/duplicate-error');
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(409);
      expect(res.body.message).toBe('Duplicate Entry Error');
      expect(res.body.errorMessages).toEqual([{ path: 'email', message: 'email already exists' }]);
    });

    it('should accept valid requests with validateRequest', async () => {
      const res = await request(testApp)
        .post('/test/validate')
        .send({ username: 'john', email: 'john@example.com' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.body.username).toBe('john');
    });

    it('should reject invalid requests and format Zod validation errors', async () => {
      const res = await request(testApp)
        .post('/test/validate')
        .send({ username: 'jo', email: 'invalid-email' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation Error');
      expect(res.body.errorMessages).toEqual(
        expect.arrayContaining([
          { path: 'body.username', message: 'String must contain at least 3 character(s)' },
          { path: 'body.email', message: 'Invalid email' },
        ])
      );
    });

    it('should format unexpected standard Errors using global handler', async () => {
      const res = await request(testApp).get('/test/sync-error');
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(500);
      expect(res.body.message).toBe('Generic test error');
    });
  });
});
