import express from "express";

import asyncHandler from "../utils/asyncHandler.util.js";

// ---------- functions from controllers -----------
import {
  showAllListings,
  addNewListing,
  editListing,
  showListing,
  deleteListing,
} from "../controllers/listing.controller.js";

// ---------- validated middlewares ----------
import { joiListingValidation } from "../middlewares/joiSchema.middleware.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(asyncHandler(showAllListings))
  .post(joiListingValidation, protect, asyncHandler(addNewListing));

router
  .route("/:listingId")
  .get(asyncHandler(showListing))
  .put(joiListingValidation, protect, asyncHandler(editListing))
  .delete(protect, asyncHandler(deleteListing));

export default router;
