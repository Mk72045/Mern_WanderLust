import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

import jwt from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.util.js";
import ExpressError from "../utils/expressError.util.js";


const protect = asyncHandler(async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    throw new ExpressError(401, "You must be logged in!");
  }

  let decoded = await jwt.verify(token, JWT_SECRET);

  req.User = decoded;
  next();
});

export default protect;
