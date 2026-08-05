import OTP from "../models/otp.model.js";
import  optGenerator  from "../utils/optGenerator.util.js";
import bcrypt from "bcrypt";

// ===== storing otp in database =====

export const createOTP = async (email) => {
  // Generate plain OTP
  const otp = optGenerator();

  // Hash the OTP
  const hashedOTP = await bcrypt.hash(otp, 10);

  // Store hashed OTP
  await OTP.create({
    email,
    otp: hashedOTP,
  });

  // Return plain OTP to send via email
  return otp;
};
