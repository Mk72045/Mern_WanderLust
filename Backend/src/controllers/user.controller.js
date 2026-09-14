import dotenv from "dotenv";
dotenv.config();

// ========== packages ==========
import bcrypt from "bcrypt";

// ========== files & functions ==========

import User from "../models/user.model.js";
import TempUser from "../models/tempUser.model.js";
import generateToken from "../utils/generateToken.util.js";
import cookieOptions from "../utils/cookieOptions.js";
import OTP from "../models/otp.model.js";
import ExpressError from "../utils/expressError.util.js";
import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";

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
    throw new ExpressError(401, "User not Found");
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

export const deleteUser = async (req, res) => {
  console.log("user in delte use", req.User);
  const { id: userId } = req.User;

  const user = await User.findOneAndDelete({
    _id: userId,
  });

  if (!user) {
    throw new ExpressError(404, "User account not found.");
  }

  console.log("user after deletion", user);

  const listings = await Listing.find({
    owner: user._id,
  }).select("_id");


  console.log("listings", listings);

  const listingIds = listings.map((listing) => listing._id);

  console.log("listingIds after deletion", listingIds);

  await Review.deleteMany({
    $or: [{ author: user._id }, { listing: { $in: listingIds } }],
  });

  await Listing.deleteMany({
    owner: user._id,
  });

  res.clearCookie("token", cookieOptions);

  res.status(200).json({
    message: "User account deleted successfully.",
  });
};
