class ApiResponseError extends Error {
  constructor(
    statusCode,
    data = null,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.data = data;
    this.message = message;
    this.isSuccess = statusCode > 400;
    this.error = errors;

    if (!stack) {
      this.stack = this.stack;
    } else {
      this.stack = Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiResponseError };
