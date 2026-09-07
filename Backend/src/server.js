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
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";


// ========== importing files & functions ==========

// ===== routes =====
import listingRoutes from "./routes/listing.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import otpRoute from "./routes/otp.routes.js";

// ===== funtions =====
import cookieOptions from "./utils/cookieOptions.js";

// ========== database and port connection ==========
mongoose
  .connect(Mongo_Atlas_Url)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => {
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
    ...cookieOptions,
    expires: parseInt(COOKIE_MAX_AGE),
  },
};

// ========== some configration ==========
const app = express();
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(session(sessionOptions));


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
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});
