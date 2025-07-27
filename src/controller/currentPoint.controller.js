const httpStatus = require("http-status");
const { currentPointService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit,populate, ...query } = req.query;
  const filter = query;
  const data = await currentPointService.FromQuery(filter, { page, limit ,populate});
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await currentPointService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create current point", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await currentPointService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch current point by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await currentPointService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update current point by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await currentPointService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete current point by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
