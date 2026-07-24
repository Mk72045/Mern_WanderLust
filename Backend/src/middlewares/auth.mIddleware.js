// // middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";
// import asyncHandler from "../utils/asyncHandler.js";

// const protect = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   const token = authHeader.split(" ")[1];

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   // Attach the admin to the request so controllers can access req.admin if needed
//   req.admin = await Admin.findById(decoded.id).select("-password");

//   if (!req.admin) {
//     return res.status(401).json({ message: "Admin no longer exists" });
//   }

//   next(); // token is valid, let the request continue to the actual route
// });

// export default protect;
