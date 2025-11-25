class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isSuccess = statusCode > 400;
    this.errors = errors;

    if (!stack) {
      this.stack = stack;
    } else {
      this.stack = Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
