const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { currentPointModel } = require("../models");

const Create = async (body) => {
  return await currentPointModel.create(body);
};

const getById = async (id) => {
  const data = await currentPointModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  return await currentPointModel.paginate(filter, option);
};

const deleteById = async (id) => {
  const result = await currentPointModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }
  return "Data successfully deleted";
};

// ✅ FIXED: Returns a single Mongoose document, not array or string
const findByUserId = async (userId) => {
  const result = await currentPointModel.findOne({ userId }); // ✅ only one document
  return result; // may return null, handle in controller
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
  findByUserId, // ✅ now returns a single document
};
