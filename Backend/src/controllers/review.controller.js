import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";

export const showAllReveiws = async (req, res, next) => {
  let { listingId } = req.params;

  let allReviews = await Review.find({ author: listingId });

  if (allReviews.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Threr are not any review",
    });
  }

  res.status(200).json({
    success: true,
    message: "reveiws are fetched successfully",
    allReviews,
  });
};

export const createReview = async (req, res) => {
  let { listingId } = req.params;
  let { rating, comment } = req.body.Review;

  let listing = await Listing.findById(listingId);

  let result = new Review({
    rating,
    comment,
    author: listingId,
  });

  await result.save();

  listing.reviews.push(result);

  await listing.save();

  return res.status(200).json({
    success: true,
    message: "review is created successfully",
  });
};

export const deleteReview = async (req, res) => {
  let { reviewId } = req.params;

  let result = await Review.findByIdAndDelete(reviewId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "review is not fond to delete",
    });
  }

  res.status(200).json({
    success: true,
    message: "review is deleted successfully",
  });
};

export const editReview = async (req, res) => {
  let { reviewId } = req.params;

  let reviewData = req.body.Review;

  let result = await Review.findByIdAndUpdate(reviewId, reviewData);

  if (!result) {
    return res.status(404).json({
      success: true,
      message: "review not found to edit",
    });
  }

  res.status(200).json({
    success: true,
    message: "review is edited successfully",
  });
};
