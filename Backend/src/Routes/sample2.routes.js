// // inquiryRoutes

// // routes/inquiryRoutes.js
// import express from "express";
// import {
//   createInquiry,
//   getInquiries,
//   markInquirySeen,
// } from "../controllers/inquiryController.js";

// import protect from "../middleware/authMiddleware.js";
// import { inquiryLimiter } from "../middleware/rateLimiter.js";

// const router = express.Router();

// router.post("/", inquiryLimiter, createInquiry);
// router.get("/", protect, getInquiries);
// router.put("/:id", protect, markInquirySeen);

// export default router;