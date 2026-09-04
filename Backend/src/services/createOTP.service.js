import OTP from "../models/otp.model.js";
import  otpGenerator  from "../utils/otpGenerator.util.js";
import bcrypt from "bcrypt";

// ===== storing otp in database =====

export const createOTP = async (username) => {
  // Generate plain OTP
  const otp = otpGenerator();

  // Hash the OTP
  const hashedOTP = await bcrypt.hash(otp, 10);

  // Store hashed OTP
  await OTP.create({
    username,
    otp: hashedOTP,
  });

  // Return plain OTP to send via username
  return otp;
};
