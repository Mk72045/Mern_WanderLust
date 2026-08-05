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

router
  .route("/")
  .get(asyncHandler(showAllReveiws))
  .post(joiReviewValidation, asyncHandler(createReview));

router
  .route("/:reviewId")
  .put(joiReviewValidation, asyncHandler(editReview))
  .delete(asyncHandler(deleteReview));

export default router;
