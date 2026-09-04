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

const addNewOTP = async (req, res) => {
  console.log("otp controller", req.body);

  let { username, password } = req.body.User;

  if (!username || !password) {
    return res.status(400).json({
      success: true,
      message: "fill all the required areas",
    });
  }

  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  let tempUser = await TempUser.findOne({ username });

  if (tempUser) {
    tempUser.expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await tempUser.save();

    res.status(200).json({
      success: true,
      message: "User already exists in temp database",
      tempUser,
    });
  }

  let otp = await createOTP(username);
  await sendOTP(username, otp);

  let hashPass = await bcrypt.hash(password, 10);

  let result = await TempUser.create({
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
