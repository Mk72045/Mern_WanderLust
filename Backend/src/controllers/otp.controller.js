import dotenv from "dotenv";
dotenv.config();

const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

// ========== packages ==========
import bcrypt from "bcrypt";

// ========== files & functions ==========
import User from "../models/user.model.js";
import sendOTP from "../services/sendOTP.service.js";
import { createOTP } from "../services/createOTP.service.js";

import TempUser from "../models/tempUser.model.js";
import OTP from "../models/otp.model.js";

const addNewOTP = async (req, res) => {
  console.log("otp controller", req.body);

  const { username, password } = req.body.User;

  if (!username || !password) {
    return res.status(400).json({
      success: true,
      message: "fill all the required areas",
    });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const otp = await createOTP(username);

  const tempUser = await TempUser.findOne({ username });

  if (tempUser) {
    tempUser.expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await tempUser.save();

    const oldOTP = await OTP.findOne({ username });

    oldOTP.expireAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await sendOTP(username, otp);

    return res.status(200).json({
      success: true,
      message: "User already exists in temp database",
      tempUser,
    });
  }

  await sendOTP(username, otp);

  const hashPass = await bcrypt.hash(password, 10);

  const result = await TempUser.create({
    username,
    password: hashPass,
  });

  console.log("otp send");

  res.status(200).json({
    success: true,
    message: `OTP is sent successfully to ${username}`,
    User: result,
  });
};

export default addNewOTP;
