import OTP from "../models/otp.model.js";
import otpGenerator from "../utils/otpGenerator.util.js";
import bcrypt from "bcrypt";

// ===== storing otp in database =====

export const createOTP = async (username) => {
  const otp = otpGenerator();
  const hashedOTP = await bcrypt.hash(otp, 10);

  await OTP.create({
    username,
    otp: hashedOTP,
  });

  // Return plain OTP to send via username
  return otp;
};
