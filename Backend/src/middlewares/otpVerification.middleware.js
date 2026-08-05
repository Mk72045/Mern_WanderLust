import bcrypt from "bcrypt";

// ========== file and functions ==========
import asyncHandler from "../utils/asyncHandler.util.js";
import sendOTP from "../services/sendOTP.service.js";
import { createOTP } from "../services/createOTP.service.js";
import OTP from "../models/otp.model.js";

export const otpVerification = async (req, res, next) => {
  let { email, otp } = req.body.OTP;

  let userData = await OTP.findOne({ email });

  if (!userData) {
    return res.status(400).json({
      success: false,
      message: "OTP is not found out",
    });
  }

  let isMatch = await bcrypt.compare(otp, userData.otp);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "wrong OTP",
    });
  }

  next();
};
