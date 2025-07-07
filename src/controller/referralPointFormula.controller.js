const httpStatus = require("http-status");
const { referralPointFormulaService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await referralPointFormulaService.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await referralPointFormulaService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create referral point formula", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await referralPointFormulaService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch referral point formula by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await referralPointFormulaService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update referral point formula by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await referralPointFormulaService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete referral point formula by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
