import express from "express";
import asyncHandler from "../utils/asyncHandler.util.js";

// ========== functions from controllers ==========

import { signUp, login, logout } from "../controllers/user.controller.js";
import { otpVerification } from "../middlewares/otpVerification.middleware.js";

// ========== Joi validated middleware ==========
import { joiOtpValidation } from "../middlewares/joiSchema.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/signup")
  .post(
    joiOtpValidation,
    asyncHandler(otpVerification),
    asyncHandler(signUp));

router
  .route("/login")
  .post(asyncHandler(login));

router
  .route("/logout")
  .get(asyncHandler(logout));

export default router;
