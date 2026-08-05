import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", ReviewSchema);
export default Review;
