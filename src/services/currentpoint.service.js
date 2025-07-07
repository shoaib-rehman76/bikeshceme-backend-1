const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {  currentPointModel} = require("../models");

const Create = async (body) => {
  const data = await currentPointModel.create(body);
  return data;
};

const getById = async (id) => {
  const data = await currentPointModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that Id");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  const result = await currentPointModel.paginate(filter, option);
  return result;
};

const deleteById = async (id) => {
  const result = await currentPointModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }
  return "Data successfully deleted";
};

const updateById = async (id, body) => {
  const data = await getById(id);

  Object.assign(data, body);

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
