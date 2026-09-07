import bcrypt from "bcrypt";

// ========== file and functions ==========
import OTP from "../models/otp.model.js";
import ExpressError from "../utils/expressError.util.js";

export const otpVerification = async (req, res, next) => {
  let { username, otp } = req.body.OTP;

  if (!username || !otp) {
    throw new ExpressError(400, "Username and OTP are required");
  }

  username = username.trim();
  otp = otp.trim();

  let userData = await OTP.findOne({ username });

  if (!userData) {
    throw new ExpressError(400, "OTP not found. Please try signing up again");
  }

  let isMatch = await bcrypt.compare(otp, userData.otp);

  if (!isMatch) {
    throw new ExpressError(400, "Incorrect OTP");
  }

  next();
};
