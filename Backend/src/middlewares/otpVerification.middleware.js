import bcrypt from "bcrypt";

// ========== file and functions ==========
import OTP from "../models/otp.model.js";

export const otpVerification = async (req, res, next) => {
  let { username, otp } = req.body.OTP;

  username = username.trim();
  otp = otp.trim();

  let userData = await OTP.findOne({ username });

  if (!userData) {
    return res.status(400).json({
      success: false,
      message: "OTP is not found out! Please try again Signup",
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
