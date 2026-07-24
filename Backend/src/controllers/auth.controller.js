// // controllers/authController.js
// import bcrypt from "bcrypt";
// import Admin from "../models/Admin.js";
// import generateToken from "../utils/generateToken.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // @route   POST /api/auth/login
// // @desc    Admin login — the ONLY auth route your app exposes publicly
// export const loginAdmin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     // Same generic message whether email OR password is wrong —
//     // don't reveal which one, so attackers can't guess valid emails
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = generateToken(admin._id);

//   res.json({
//     token,
//     admin: {
//       id: admin._id,
//       name: admin.name,
//       email: admin.email,
//     },
//   });
// });
