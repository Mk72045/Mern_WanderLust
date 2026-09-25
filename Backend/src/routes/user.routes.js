import express from "express";
import asyncHandler from "../utils/asyncHandler.util.js";

// ========== functions from controllers ==========

import {
  signUp,
  login,
  logout,
  forgotPassword,
  deleteUser,
} from "../controllers/user.controller.js";
import { otpVerification } from "../middlewares/otpVerification.middleware.js";

// ========== Joi validated middleware ==========
import { joiOtpValidation } from "../middlewares/joiSchema.middleware.js";
import getCurrentUser from "../controllers/auth.controller.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router({ mergeParams: true });

router.route("/signup").post(joiOtpValidation, asyncHandler(otpVerification), asyncHandler(signUp));

router.route("/login").post(asyncHandler(login));

router.route("/").get(asyncHandler(getCurrentUser));

router.route("/logout").get(asyncHandler(logout));

router.route("/forgotPassword").post(joiOtpValidation, asyncHandler(otpVerification), asyncHandler(forgotPassword));

router.route("/delete").delete(protect, asyncHandler(deleteUser));

export default router;
