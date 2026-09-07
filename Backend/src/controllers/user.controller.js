import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// ========== packages ==========
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ========== files & functions ==========

import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";
import generateToken from "../utils/generateToken.util.js";
import cookieOptions from "../utils/cookieOptions.js";
import OTP from "../models/otp.model.js";
import ExpressError from "../utils/expressError.util.js";

export const signUp = async (req, res) => {
  let { username } = req.body.OTP;

  let user = await User.findOne({ username });

  if (user) {
    throw new ExpressError(409, "User already exists");
  }

  let tempUser = await TempUser.findOne({ username });

  if (!tempUser) {
    throw new ExpressError(400, "Go to signup page and fill required data again");
  }

  const newUser = await User.create({
    username: tempUser.username,
    password: tempUser.password,
  });

  let token = await generateToken(newUser._id);

  res.cookie("token", token, cookieOptions);

  await TempUser.deleteOne({ username });
  await OTP.deleteOne({ username });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    newUser,
  });
};

export const login = async (req, res) => {
  if (!req.body.User) {
    throw new ExpressError(400, "User data is required");
  }

  let { username, password } = req.body.User;

  if (!username || !password) {
    throw new ExpressError(400, "Please enter username and password");
  }

  let user = await User.findOne({ username });

  if (!user) {
    throw new ExpressError(401, "Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ExpressError(401, "Invalid username or password");
  }

  let token = await generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    User: user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
