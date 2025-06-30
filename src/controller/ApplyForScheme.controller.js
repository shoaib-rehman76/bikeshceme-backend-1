const httpStatus = require("http-status");
const { ApplyForSchemeService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await ApplyForSchemeService.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create ApplyForSchemeService", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch ApplyForSchemeService by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update ApplyForSchemeService by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete ApplyForSchemeService by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
