const httpStatus = require("http-status");
const { giftService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await giftService.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await giftService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create gift", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await giftService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch gift by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await giftService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update gift by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await giftService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete gift by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
