// ========== packages ==========
import bcrypt from "bcrypt";

// ========== files & functions ==========

import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";
import generateToken from "../utils/generateToken.util.js";

// export const signUpForm = (req, res) => {};

export const signUp = async (req, res) => {
  let { email, opt } = req.body.OTP;

  // checking for existing user
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "user already exists",
    });
  }

  let tempUser = await TempUser.findOne({ email });

  if (!tempUser) {
    return res.status(400).json({
      success: false,
      message: "Go to signup page and fill required data",
    });
  }

  const newUser = await User.create({
    username: tempUser.username,
    email: tempUser.email,
    password: tempUser.password,
  });

  let token = await generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    newUser,
  });
};

// export const loginForm = (req, res) => {};

export const login = async (req, res) => {
  let { email, password } = req.body.User;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "enter required credentials",
    });
  }

  let user = await User.findOne({ email });

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
      message: "Invalid Email or Password",
    });
  }

  let token = await generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "login successful",
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logout successful",
  });
};
