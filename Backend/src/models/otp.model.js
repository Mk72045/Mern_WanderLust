import dotenv from "dotenv";
dotenv.config();

const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

import { Schema, model } from "mongoose";

const optSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

optSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

const OTP = model("opt", optSchema);

export default OTP;
