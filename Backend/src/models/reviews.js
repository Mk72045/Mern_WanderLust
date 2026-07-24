import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  created: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Review", ReviewSchema);
