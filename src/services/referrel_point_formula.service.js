const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {  referralPointsModel} = require("../models");

const Create = async (body) => {
  const data = await referralPointsModel.create(body);
  return data;
};

const getById = async (id) => {
  const data = await referralPointsModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that Id");
  }
  return data;
};

const getByType = async (type) => {
  const data = await referralPointsModel.findOne({ type });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that type");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  const result = await referralPointsModel.paginate(filter, option);
  return result;
};

const deleteById = async (id) => {
  const result = await referralPointsModel.findByIdAndDelete(id);
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
  getByType
};
