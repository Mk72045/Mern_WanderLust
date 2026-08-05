import Review from "../models/review.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const findOneAndDelete_Mid = (schema) => {
  schema.post(
    "findOneAndDelete",
    asyncHandler(async (listing) => {
      if (!listing) return;

      let result = await Review.deleteMany({ _id: { $in: listing.reviews } });
    })
  );
};
