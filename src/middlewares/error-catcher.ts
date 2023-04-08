import { NextFunction, Request, Response } from "express";
import { _AppError } from "../errors/AppError";

export const errorCatcher = (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof _AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
}