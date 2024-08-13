class HttpException extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpException {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class UnauthorizedError extends HttpException {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

class ForbiddenError extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

class NotFoundError extends HttpException {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class InternalServerError extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

export default {
  HttpException,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};