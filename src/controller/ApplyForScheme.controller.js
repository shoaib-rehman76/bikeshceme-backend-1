const httpStatus = require("http-status");
const { ApplyForSchemeService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { ApiResponse } = require("../utils");
const { ApplyForSchemeModel } = require("../models");

const getAlls = catchAsync(async (req, res, next) => {
  const { page, limit, populate, ...query } = req.query;
  const filter = query;

  const data = await ApplyForSchemeService.FromQuery(filter, {
    page,
    limit,
    populate,
  });
  ApiResponse.successResponse(res, data);
});

const getRandomWinner = catchAsync(async (req, res, next) => {
  // 1. Count all uncompleted entries
  const count = await ApplyForSchemeModel.countDocuments({
    isCompleted: false,
    status: "approved",
  });

  if (count === 0) {
    return ApiResponse.notFoundResponse(res, "No uncompleted entries found.");
  }

  // 2. Pick a random index
  const randomIndex = Math.floor(Math.random() * count);

  // 3. Get the random entry using skip
  const randomEntry = await ApplyForSchemeModel.findOne({ isCompleted: false })
    .skip(randomIndex)
    .populate("userId")
    .populate("productId");

  if (!randomEntry) {
    return ApiResponse.notFoundResponse(res, "Failed to select random entry.");
  }

  // 4. Set all IsWinner = false (reset)
  await ApplyForSchemeModel.updateMany({}, { isCompleted: true });

  // 5. Mark selected entry as winner and completed
  randomEntry.IsWinner = true;
  randomEntry.isCompleted = true;
  await randomEntry.save();

  // 6. Return the winner
  ApiResponse.successResponse(res, randomEntry);
});

// 7. Send response

const createOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.Create(req.body);
  ApiResponse.createSuccessResponse(res, "create ApplyForSchemeService", data);
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.getById(req.params.id);
  ApiResponse.successResponseById(
    res,
    "Fetch ApplyForSchemeService by id",
    data
  );
});

const updateOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.updateById(req.params.id, req.body);
  ApiResponse.successResponseById(
    res,
    "update ApplyForSchemeService by id",
    data
  );
});

const deleteOne = catchAsync(async (req, res, next) => {
  const data = await ApplyForSchemeService.deleteById(req.params.id);
  ApiResponse.successResponseById(
    res,
    "delete ApplyForSchemeService by id",
    data
  );
});
module.exports = {
  getAlls,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getRandomWinner,
};
