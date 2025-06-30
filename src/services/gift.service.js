const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { giftModel } = require("../models");

const Create = async (body) => {
  const data = await giftModel.create(body);
  return data;
};

const getById = async (id) => {
  const data = await giftModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that Id");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  const result = await giftModel.paginate(filter, option);
  return result;
};

const deleteById = async (id) => {
  const result = await giftModel.findByIdAndDelete(id);
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
