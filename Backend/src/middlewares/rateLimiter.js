// // middleware/rateLimiter.js
// import rateLimit from "express-rate-limit";

// export const inquiryLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 inquiry submissions per window
//   message: {
//     message: "Too many inquiries submitted. Please try again later.",
//   },
// });