// ========== importing packages ==========
import express from "express";

const router = express.Router({ mergeParams: true });

// ========== files and functions importing ==========
import { joiUserValidation } from "../middlewares/joiSchema.middleware.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import addNewOTP from "../controllers/otp.controller.js";

router
  .route("/otp")
  .post(joiUserValidation, asyncHandler(addNewOTP));

export default router;
