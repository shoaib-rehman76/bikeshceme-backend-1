const httpStatus = require("http-status");
const userServices = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getUsers = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await userServices.queryUsers(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const deleteUsers = catchAsync(async (req, res, next) => {
  const user = await userServices.deleteUser(req.params.id);
  res.status(httpStatus.OK).json(user);
});

const getById = catchAsync(async (req, res, next) => {
  const user = await userServices.getUserById(req.params.id);
  res.status(httpStatus.OK).json(user);
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await userServices.getUserQuery(req.query);
  res.status(httpStatus.OK).json(user);
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const user = await userServices.allUser();
  res.status(httpStatus.OK).json(user);
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await userServices.updateUser(req.params.id, req.body);
  res.status(httpStatus.OK).json(user);
});

module.exports = {
  getUsers,
  deleteUsers,
  getById,
  getUser,
  updateUser,
  getAllUsers,
};
