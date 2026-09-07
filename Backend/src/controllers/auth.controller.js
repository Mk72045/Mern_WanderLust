import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import ExpressError from "../utils/expressError.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  // console.log("at auth.controller");

  if (!token) {
    // console.log("in token ");

    throw new ExpressError(401, "Not authenticated");
  }

  // console.log("token", token);

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (jwtErr) {
    throw new ExpressError(401, "Invalid or expired token");
  }

  // console.log("decoded", decoded);

  const user = await User.findById(decoded.id).select("-password");

  // console.log("user", user);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  // console.log("user", user);

  return res.status(200).json({
    success: true,
    user,
  });
};

export default getCurrentUser;
