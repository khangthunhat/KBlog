import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErorrHandler";

/**
 * A middleware function for handling errors in the application.
 * It sets the error status code and message, and then sends a JSON response with the error details.
 *
 * @param {any} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {void}
 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value: any) => value.message
    );
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
