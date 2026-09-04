import express from "express";
import asyncHandler from "../utils/asyncHandler.util.js";

const router = express.Router({ mergeParams: true });

// ========== functions from controllers ==========
import {
  showAllReveiws,
  createReview,
  deleteReview,
  editReview,
} from "../controllers/review.controller.js";

// ========== Joi validated middleware ==========
import { joiReviewValidation } from "../middlewares/joiSchema.middleware.js";
import protect from "../middlewares/protect.middleware.js";

router
  .route("/")
  .get(asyncHandler(showAllReveiws))
  .post(protect, joiReviewValidation, asyncHandler(createReview));

router
  .route("/:reviewId")
  .put(protect, joiReviewValidation, asyncHandler(editReview))
  .delete(protect, asyncHandler(deleteReview));

export default router;
