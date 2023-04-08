import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../errors/AppError";
import { ENV } from "../utils/env";

export const jwtValidator = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw AppError('Invalid token', 401)
    }

    const token = authorization.split(' ')[1];

    const verify = jwt.verify(token, ENV.PRIVATE_KEY)

    if (typeof verify == 'object') {
      response.locals.user = verify.email
    } else {
      throw AppError('Invalid token', 403)
    }

    next();
  } catch (error) {
    throw error;
  }
}