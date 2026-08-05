import dotenv from "dotenv";
dotenv.config();

const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

// ========== packages ==========
import bcrypt from "bcrypt";

// ========== files & functions ==========
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import sendOTP from "../services/sendOTP.service.js";
import { createOTP } from "../services/createOTP.service.js";
import generateToken from "../utils/generateToken.util.js";
import TempUser from "../models/tempUser.model.js";

const addNewOTP = async (req, res) => {

  let { username, email, password } = req.body.User;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: true,
      message: "fill all the required areas",
    });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  let tempUser = await TempUser.findOne({ email });

  if (tempUser) {
    tempUser.expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await tempUser.save();

    return res.status(400).json({
      success: false,
      message: "User already exists in temp database",
    });
  }

  let otp = await createOTP(email);
  sendOTP(email, otp);

  let hashPass = await bcrypt.hash(password, 10);

  let result = await TempUser.create({
    username,
    email,
    password: hashPass,
  });

  res.status(201).json({
    success: true,
    message: `OTP is sent successfully to ${email}`,
    result,
  });
};

export default addNewOTP;
