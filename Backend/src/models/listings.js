import { Schema, model } from "mongoose";

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { url: { type: String }, filename: { type: String } },
  price: { type: Number, min: 0 },
  location: { type: String },
  country: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Listing", listingSchema);
