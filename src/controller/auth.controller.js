const userServices = require("../services/user.services");
const { generateAuthTokens } = require("../services/token.service");
const catchAsync = require("../utils/catchAsync");
const {
  EmailServices,
  authService,
  userService,
  emailService,
  tokenService,
  currentPointService,
  referralPointFormulaService,
} = require("../services");
const { ApiError } = require("../utils");
const User = require("../models/user.model"); // Assuming User is your Mongoose model
const { generateOtp } = require("../utils/generateOtp");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs/dist/bcrypt");

const register = catchAsync(async (req, res, next) => {
  const users = await userServices.CreateUser(req.body);
  const token = await generateAuthTokens(users);
  await emailService.sendOTPEmail(req, res, users);

  let referralUser = null;

  // ✅ Handle referral logic
  if (req.body.referralCode) {
    referralUser = await userService.findByReferralCode(req.body.referralCode);
    if (!referralUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Referral code not found");
    }

    // ✅ Save referral metadata to new user
    users.referralCode = referralUser.referralCode;
    users.referrerId = referralUser._id;
    users.isReferral = true;
    await users.save();

    // ✅ Fetch referral formula
    const referralPointFormula = await referralPointFormulaService.getByType("referral");

    // ✅ Find referrer point doc (returning full Mongoose doc!)
    const referrerPointDoc = await currentPointService.findByUserId(referralUser._id);

    if (referrerPointDoc) {
      // ✅ Modify and save
      referrerPointDoc.currentPoint += referralPointFormula.earnPoint;
      referrerPointDoc.equivalenceRupees += referralPointFormula.equivalenceRupees;
      await referrerPointDoc.save();
    } else {
      // ✅ First time referral point record
      await currentPointService.Create({
        userId: referralUser._id,
        currentPoint: referralPointFormula.earnPoint,
        equivalenceRupees: referralPointFormula.equivalenceRupees,
        isActive: true,
      });
    }
  }

  // ✅ Initialize currentPoint = 0 for new user
  await currentPointService.Create({
    userId: users._id,
    currentPoint: 0,
    equivalenceRupees: 0,
    isActive: true,
  });

  res.send({ token, users });

  // ✅ Clear OTP after 10 mins
  setTimeout(() => {
    userServices.clearOTP(users._id);
  }, 10 * 60 * 1000);
});


const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await generateAuthTokens(user);
  res.send({ tokens, user });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send({
    message:"successfully logout"
  });
});

const verifyOTP = async (req, res) => {
  try {
    const otp = req.body.otp; // Extract OTP from the request body
    const user = await userService.getUserByEmail(req.body.email); // Fetch the user by email

    if (!otp) {
      throw new ApiError(404, "Invalid OTP");
    }

    if (!user.otp || user.otp !== otp) {
      throw new ApiError(404, "OTP not found");
    }

    // Update user details
    user.isEmailVerified = true;
    user.otp = undefined;
    await user.save();

    // Create the initial current points

    res.status(200).json({
      message: "Account verified",
    });
  } catch (error) {
    // Handle errors and send the appropriate response
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { user, resetPasswordToken } =
    await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req, res, {
    user,
    resetPasswordToken,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.OK).send({
    message: "update successfully changed",
  });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});
const regenerateOTP = catchAsync(async (req, res) => {
  try {
    // Generate OTP
    const OTP = generateOtp();

    // Get User
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    // Save OTP to user document
    user.otp = OTP;
    await user.save();

    // Send OTP email
    await emailService.sendOTPEmail(req, res, user);

    // Clean up OTP after 10 minutes
    setTimeout(async () => {
      user.otp = undefined;
      await user.save();
    }, 10 * 60 * 1000);

    // Send response
    res.status(200).json({
      message:
        "OTP sent successfully to your email. Please verify within 10 minutes",
      OTP: OTP, // Show the OTP for testing purposes (remove in production)
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.toString() });
  }
});

const googleAuthCallback = async (req, res) => {
  // Google authentication is successful, user is in `req.user`
  const user = req.user;

  // Generate access and refresh tokens
  const tokens = await generateAuthTokens(user);

  res.status(200).json({
    message: "Google Login Successful",
    tokens,
  });
};



const changePassword = async (req, res) => {
  const userId = req.user.id; // ✔️ assuming auth middleware sets this
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await user.isPasswordMatch(oldPassword);
  if (!isMatch) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  user.password = newPassword; // ✅ hashing is handled by pre('save')
  await user.save();

  return res.status(200).json({ message: "Password changed successfully ✅" });
};


module.exports = {
  register,
  login,
  verifyOTP,
  googleAuthCallback,
  logout,
  regenerateOTP,
  verifyEmail,
  sendVerificationEmail,
  resetPassword,
  forgotPassword,
  refreshTokens,
  changePassword
};
