const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Check if the email is already taken
const isEmailTaken = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "Email already taken");
  }
  return false;
};

// Create a new user
const CreateUser = async (body) => {
  // await isEmailTaken(body.email);
  // body.password = await hashPassword(body.password);
  const user = new User(body);
  await user.save();
  return user;
};

const getMes = async (userId) => {
  const user = await getUserById(userId);
  return user;
};

// Get user by ID
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  const data = await User.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "no user found with that");
  }
  return data;
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  // Check if the user exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the email is being updated and is already taken
  if (updateBody.email === user.email) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email is already taken. Please try a different one."
    );
  }

  // Update the user with the new data
  Object.assign(user, updateBody);

  // Save the updated user data
  await user.save();

  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.deleteOne({ _id: user._id });
  return user;
};

const getByCustomerId = async (customerId) => {
  const user = await User.findOne({ customerId: customerId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.deleteOne({ _id: user._id });
  return user;
};

const ResetPasswordByUserId = async (userId, updateBody) => {
  const user = await User.findById({ _id: userId });

  // Check if the user exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Update the user with the new data
  Object.assign(user, updateBody);

  // Save the updated user data
  await user.save();

  return user;
};

const findOrCreateUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.photos[0].value,
    });
  }
  return user;
};

const clearOTP = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    user.otp = undefined;
    await user.save();
  }
};
const allUser = async () => {
  const activeUser = await User.find({ isActive: true });
  const isBlockUser = await User.find({ isBlock: true });
  const isEmailVerifiedUser = await User.find({ isEmailVerified: true });
  const emailNotVerifiedUser = await User.find({ isEmailVerified: false });
  const totalUser = await User.find();
  return {
    activeUser,
    isBlockUser,
    isEmailVerifiedUser,
    emailNotVerifiedUser,
    totalUser,
  };
};


  const findByReferralCode = async (referralCode) => {
    const singleuser = await User.findOne({referralCode})
  
    if (!singleuser) {
      throw new ApiError(404, `No document found with that referralCode : ${referralCode}`);
    }
    return singleuser;
  }
module.exports = {
  CreateUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getByCustomerId,
  ResetPasswordByUserId,
  findOrCreateUser,
  clearOTP,
  isEmailTaken,
  allUser,
  getMes,
  findByReferralCode
};
