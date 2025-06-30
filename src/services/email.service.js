const { OTP, resetPasswordEmail } = require("../EmailTemplates/EmailTemplates");
const { sendEmail } = require("../utils/EmailSend");
const { generateOtp } = require("../utils/generateOtp");
const sendOTPEmail = async (req, res, user) => {
  // Generate OTP
  user.otp = generateOtp();
  try {
    // Save OTP to the user
    await user.save();

    // Generate OTP email content
    const otpMail = OTP(user);

    // Send email
    await sendEmail({
      from: '"baiksceem" <baiksceem@gmail.com>',
      email: req.body.email,
      subject: "OTP Confirmation - baiksceem",
      html: otpMail,
    });
  } catch (err) {
    user.otp = undefined;
    user.isEmailVerified = false;
    await user.save();

    // Send email
    // await sendEmail({
    //     from: '"sabkobol" <larryfarm30005@gmail.com>',
    //     email: req.body.email,
    //     subject: 'OTP Confirmation - Sabkobol',
    //     html: otpMail,
    // });

    throw new Error(err);
  }
};
const sendResetPasswordEmail = async (
  req,
  res,
  { user, resetPasswordToken }
) => {
  // frontEnd url
  const resetURL = `http://localhost:3003/reset-password?token=${resetPasswordToken}`;

  try {
    const emailHtml = resetPasswordEmail(user, resetURL);

    await sendEmail({
      from: '"baiksceem" <noreply@baiksceem.com>',
      email: req.body.email,
      subject: "Password Reset Confirmation - baiksceem",
      html: emailHtml,
    });

    res.status(200).json({
      status: "success",
      message: `Password reset instructions have been sent to ${req.body.email}.`,
      resetPasswordToken: resetURL,
    });
  } catch (err) {
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new Error(err);
  }
};

module.exports = {
  sendOTPEmail,
  sendResetPasswordEmail,
};
