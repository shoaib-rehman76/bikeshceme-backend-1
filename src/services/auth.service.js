// auth.service.js
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const userService = require("./user.services"); // Correct the import path if necessary
const bcrypt = require("bcrypt");
const { tokenTypes } = require("../config/tokens");
const tokenService = require("./token.service");
const { Token } = require("../models");

const userServices = require("./user.services"); // Correct the import path if necessary

// Use the imported isEmailTaken function
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "incorrect Email ");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please verify your email before logging into your account"
    );
  }
  if (user.isBlock) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Your account is blocked. Please contact support for assistance."
    );
  }
  return user; // Return the user if the password matches
};

const logout = async (refreshToken) => {
  const tokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }

  await tokenDoc.deleteOne();
  
  // Use this instead of `.remove()`
};

const refreshAuth = async (refreshToken) => {
  try {
    // Verify the refresh token
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );

    // Retrieve the user associated with the refresh token
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error("User not found");
    }

    // Delete all tokens related to the user
    const dat = await Token.deleteMany({ user: user._id });

    // Generate new auth tokens for the user
    const tokens = await tokenService.generateAuthTokens(user);
    return tokens;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    // Retrieve the user associated with the reset password token
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    // Log the user details and the new password

    console.log("New password to be set:", newPassword); //
    //  Update the user's password
    const updatedUser = await userService.ResetPasswordByUserId(user.id, {
      password: newPassword,
    });
    console.log("Password reset successful for user:", updatedUser);
    // Delete all reset password tokens for the user
    const tokenDeletionResult = await Token.deleteMany({
      user: user.id,
      type: tokenTypes.RESET_PASSWORD,
    });
    console.log("Deleted reset password tokens:", tokenDeletionResult);
  } catch (error) {
    // Log the error details
    console.error("Error in resetPassword:", error);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
