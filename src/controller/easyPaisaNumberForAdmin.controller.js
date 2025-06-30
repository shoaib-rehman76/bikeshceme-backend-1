const httpStatus = require("http-status");
const { easyPaisaNumberForAdminService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, ...query } = req.query;
  const filter = query;
  const data = await easyPaisaNumberForAdminService.FromQuery(filter, {
    page,
    limit,
  });
  ApiResponse.successResponse(res, data);
});

const createOne = catchAsync(async (req, res, next) => {
  const data = await easyPaisaNumberForAdminService.Create(req.body);
  ApiResponse.createSuccessResponse(
    res,
    "create easyPaisa Number by  Admin",
    data
  );
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await easyPaisaNumberForAdminService.getById(req.params.id);
  ApiResponse.successResponseById(res, "Fetch easyPaisa Number  by id", data);
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await easyPaisaNumberForAdminService.updateById(
    req.params.id,
    req.body
  );
  ApiResponse.successResponseById(res, "update easyPaisa Number  by id", data);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await easyPaisaNumberForAdminService.deleteById(req.params.id);
  ApiResponse.successResponseById(res, "delete easyPaisa Number  by id", data);
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
