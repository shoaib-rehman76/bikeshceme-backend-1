const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ApplyForSchemeModel } = require("../models");

const Create = async (body) => {
  const data = await ApplyForSchemeModel.create(body);
  return data;
};

const getById = async (id) => {
  const data = await ApplyForSchemeModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that Id");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  const result = await ApplyForSchemeModel.paginate(filter, option);
  return result;
};

const deleteById = async (id) => {
  const result = await ApplyForSchemeModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }
  return "Data successfully deleted";
};

const updateById = async (id, body) => {
  const data = await ApplyForSchemeModel.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }

  await data.save();
  return data;
};

module.exports = {
  Create,
  getById,
  deleteById,
  updateById,
  FromQuery,
};
