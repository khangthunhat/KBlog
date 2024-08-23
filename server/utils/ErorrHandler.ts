/* The `Erorrhandler` class extends the Error class in TypeScript and includes a custom statusCode
property for handling errors. */
class ErrorHandler extends Error {
  statusCode: Number;

  constructor(message: any, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;
