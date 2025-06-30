// error.js (error middleware)
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

// Convert error to ApiError if not already an instance
// const errorConverter = (err, req, res, next) => {
//   let error = err;
//   if (!(error instanceof ApiError)) {
//     const statusCode =
//       error.statusCode || (error.name === 'QueryFailedError' ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);
//     const message = error.message || httpStatus[statusCode];
//     error = new ApiError(statusCode, message, false, err.stack);
//   }
//   next(error);
// };
const errorConverter = (err, req, res, next) => {
  let error = err;

  // Check if it's a MySQL Duplicate Entry Error (ER_DUP_ENTRY)
  if (err.code === 'ER_DUP_ENTRY') {
    const field = err.message.match(/for key '(.+?)'/)?.[1]; // Extract field name from the error message
    const message = `Duplicate entry for ${field.replace('IDX_', '').toLowerCase()}`; // Customize the message
    error = new ApiError(httpStatus.BAD_REQUEST, message, false, err.stack);
  } else if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error.name === 'QueryFailedError' ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};
// Handle and format error response in JSON format
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }), // Add stack trace in development
  };

  if (config.env === 'development') {
    // logger.error(err); // Log error details in development
  }

  res.status(statusCode).json(response); // Return JSON response
};

module.exports = {
  errorConverter,
  errorHandler,
};
