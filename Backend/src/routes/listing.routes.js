import express from "express";

import asyncHandler from "../utils/asyncHandler.util.js";

// ========== functions from controllers ==========
import {
  showAllListings,
  addNewListing,
  editListing,
  showListing,
  deleteListing,
} from "../controllers/listing.controller.js";

// ========== validated middlewares ==========
import { joiListingValidation } from "../middlewares/joiSchema.middleware.js";
import protect from "../middlewares/protect.middleware.js";
import { uploadListingImage } from "../middlewares/cloudinaryUpload.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(asyncHandler(showAllListings))
  .post(uploadListingImage.single("image"), joiListingValidation, asyncHandler(addNewListing));

router
  .route("/:listingId")
  .get(asyncHandler(showListing))
  .put(uploadListingImage.single("image"), joiListingValidation, asyncHandler(editListing))
  .delete(asyncHandler(deleteListing));

export default router;
