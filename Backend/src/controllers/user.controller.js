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

export const signUp = async (req, res) => {
  let { username } = req.body.OTP;

  // checking for existing user
  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "user already exists",
    });
  }

  let tempUser = await TempUser.findOne({ username });

  if (!tempUser) {
    return res.status(400).json({
      success: false,
      message: "Go to signup page and fill required data again",
    });
  }

  const newUser = await User.create({
    username: tempUser.username,
    password: tempUser.password,
  });

  let token = await generateToken(newUser._id);

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    newUser,
  });
};

// export const loginForm = (req, res) => {};

export const login = async (req, res) => {
  let { username, password } = req.body.User;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "enter required credentials",
    });
  }

  let user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Not Found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid Username or Password",
    });
  }

  let token = await generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "login successful",
    User: user,
  });
};

export const currentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    success: true,
    message: "logout successful",
  });
};
