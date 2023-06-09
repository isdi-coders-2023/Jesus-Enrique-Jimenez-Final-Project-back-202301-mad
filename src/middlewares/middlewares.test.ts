import { middleware } from './middlewares';
import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { HTTPError } from '../errors/errors';

describe('Given middleware', () => {
  const req = {} as unknown as Request;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  describe('When the error is a CustomError, HTTPError with statusCode', () => {
    test('Then if the status code is the testNumber, it should return this value ', () => {
      const testNumber = 418;
      const error = new HTTPError(testNumber, 'test', 'test');

      middleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(testNumber);
    });
  });

  describe('When the error is a Mongoose CastError', () => {
    test('Then the status should be 400', () => {
      const error = new MongooseError.CastError('test', 400, 'test');

      middleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(400);
    });
  });

  describe('When the error is a Mongoose ValidationError', () => {
    test('Then the status should be 406 ', () => {
      const error = new MongooseError.ValidationError();

      middleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(406);
    });
  });

  describe('When the error is any other Error', () => {
    test('Then the status it should be 500 ', () => {
      const error = new Error('test');
      middleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(500);
    });
  });
});
