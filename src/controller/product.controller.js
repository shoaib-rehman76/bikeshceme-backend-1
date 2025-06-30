const httpStatus = require("http-status");
const { productServices } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await productServices.FromQuery(filter, { page, limit });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await productServices.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create product", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await productServices.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch product by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await productServices.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(res, "update product by id", data);
});

const updateProductStatusByIds = catchAsync(async (req, res, next) => {
  const data = await productServices.updateProductStatusById(
    req.params.id,
    req.body
  );
  ApiResponse.successResponseById(res, "update product status by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await productServices.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete product by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  updateProductStatusByIds,
};
