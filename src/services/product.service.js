const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ProductModel } = require("../models");

const Create = async (body) => {
  const data = await ProductModel.create(body);
  return data;
};

const getById = async (id) => {
  const data = await ProductModel.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that Id");
  }
  return data;
};

const FromQuery = async (filter, option) => {
  // Call the paginate function directly, assuming it modifies the model or operates as middleware
  const result = await ProductModel.paginate(filter, option);
  return result;
};

const deleteById = async (id) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No document found with that ID");
  }
  return "Data successfully deleted";
};

const updateById = async (id, body) => {
  const data = await getById(id);

  // Use `Object.assign` to merge updates into the existing object
  Object.assign(data, body);

  await data.save(); // Save the updated document
  return data;
};

const updateProductStatusById = async (id, body) => {
  const data = await getById(id);

  // Use `Object.assign` to merge updates into the existing object
  Object.assign(data, body);

  await data.save(); // Save the updated document
  return data;
};
module.exports = {
  Create,
  getById,
  deleteById,
  updateById,
  FromQuery,
  updateProductStatusById,
};
