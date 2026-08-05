import { Schema, model } from "mongoose";
import { findOneAndDelete_Mid } from "../middlewares/mongo.middleware.js";

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: {
      url: { type: String },
      filename: { type: String },
    },
    price: { type: Number, min: 0 },
    location: { type: String },
    country: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

listingSchema.plugin(findOneAndDelete_Mid);

const Listing = model("Listing", listingSchema);
export default Listing;
