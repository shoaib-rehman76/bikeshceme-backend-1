const httpStatus = require("http-status");
const { referralHistoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await referralHistoryService.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await referralHistoryService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create referral history", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await referralHistoryService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch referral history by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await referralHistoryService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update referral history by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await referralHistoryService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete referral history by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
