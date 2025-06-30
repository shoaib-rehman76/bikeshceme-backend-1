const httpStatus = require("http-status");
const { walletService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await walletService.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await walletService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create wallet", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await walletService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch wallet by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await walletService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update wallet by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await walletService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete wallet by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
