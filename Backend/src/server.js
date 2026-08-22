import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

// ========== fetching env file data ==========
const Mongo_Atlas_Url = process.env.Mongo_Atlas_Url;
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE;

// ========== importing packages ==========
import express from "express";
import mongoose from "mongoose";
import bycrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
// import flash from "connect-flash";

// ========== importing files ==========

// ===== routes =====
import listingRoutes from "./routes/listing.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import otpRoute from "./routes/otp.routes.js";

// ===== middlewares =====
import ExpressError from "./utils/expressError.util.js";

// ===== models =====
import Listing from "./models/listing.model.js";

// ========== database and port connection ==========
mongoose
  .connect(Mongo_Atlas_Url)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, (req, res) => {
      console.log(`Server is conencted to the PORT: ${PORT}`);
      console.log("All setup Done");
    });
  })
  .catch((err) => {
    console.log("Database connection failed: ", err);
  });

// ========== some usefulls ==========-
const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: parseInt(COOKIE_MAX_AGE),
    httpOnly: true,
  },
};

// ========== some configration ==========
const app = express();
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(session(sessionOptions));
// app.use(flash());

// ========== Different Paths ==========
app.use("/api/listings", listingRoutes);
app.use("/api/listings/:listingId/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api", otpRoute);

// ========== diffreent route error handling function ==========
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// ========== to handle all errors ==========
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong", name = "Not Found" } = err;
  res.status(status).json({
    name: name,
    success: false,
    message: message,
  });
});
