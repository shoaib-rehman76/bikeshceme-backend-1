const otpGenerator = require('otp-generator');

function generateOtp() {
  // Generate a 6-digit OTP string with only numbers (digits)
  const otpString = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  // Convert the OTP string to a number
  const otpNumber = parseInt(otpString, 10);

  if (isNaN(otpNumber)) {
    throw new Error("Failed to generate OTP as a number.");
  }

  return otpNumber;
}



module.exports = { generateOtp };
