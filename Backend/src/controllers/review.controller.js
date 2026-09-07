import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";

export const showAllReveiws = async (req, res, next) => {
  let { listingId } = req.params;

  const allReviews = await Review.find({ listing: listingId }).populate("author", "username");

  res.status(200).json({
    success: true,
    message:
      allReviews.length === 0
        ? "No reviews found for this listing"
        : "Reviews fetched successfully",
    allReviews,
  });
};

export const createReview = async (req, res) => {
  let { id: UserId } = req.User;
  let { listingId } = req.params;
  let { rating, comment } = req.body.Review;

  let listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  let result = new Review({
    rating,
    comment,
    author: UserId,
    listing: listingId,
  });

  await result.save();

  listing.reviews.push(result._id);
  await listing.save();

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    review: result,
  });
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { id: UserId } = req.User;

  const result = await Review.findOneAndDelete({
    _id: reviewId,
    author: UserId,
  });

  if (!result) {
    throw new ExpressError(404, "Review not found or you are not authorized to delete it");
  }
  console.log("at review controller result at deletion is: ", result);

  await Listing.findByIdAndUpdate(result.listing, {
    $pull: { reviews: result._id },
  });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
};
