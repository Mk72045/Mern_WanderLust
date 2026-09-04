import dotenv from "dotenv";
dotenv.config();

const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

import { Schema, model } from "mongoose";

const tempUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
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

tempUserSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

const TempUser = model("tempUser", tempUserSchema);

export default TempUser;
