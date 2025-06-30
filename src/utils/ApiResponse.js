const httpStatus = require('http-status');

const successResponse = (res, data) => {
  res.status(httpStatus.OK).json(data);
};

const successResponseWithMessage= (res, message, data) => {
  const resData = {
    status: 1,
    message,
    ...data,
  };
  res.status(httpStatus.OK).json(resData);
};

const successResponseById= (res, message, data) => {
  const resData = {
    status: 1,
    message,
    data,
  };
  res.status(httpStatus.OK).json(resData);
};

const createSuccessResponse = (res, msg, data) => {
  const resData = {
    status: 1,
    message: msg,
    data: data,
  };
  res.status(httpStatus.CREATED).json(resData);
};

const ErrorResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  res.status(httpStatus.NOT_FOUND).json(msg);
};

const notFoundResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  res.status(httpStatus.NOT_FOUND).json(data);
};

const validationErrorWithData = (res, msg, data) => {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  res.status(httpStatus.BAD_REQUEST).json(resData);
};

const unauthorizedResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  res.status(httpStatus.UNAUTHORIZED).json(data);
};

const invalidBodyValuesResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  res.status(httpStatus.UNPROCESSABLE_ENTITY).json(data);
};

const DeleteResponse = (res, msg) => {
  res.status(httpStatus.OK).json(msg);
};

// Exporting all functions
module.exports = {
  successResponse,
  successResponseWithMessage,
  successResponseById,
  createSuccessResponse,
  ErrorResponse,
  notFoundResponse,
  validationErrorWithData,
  unauthorizedResponse,
  invalidBodyValuesResponse,
  DeleteResponse,
};
