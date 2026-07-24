// import dns from "dns";
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

// import dotenv from "dotenv";
// dotenv.config();

// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;
// const MONGO_URI = process.env.MONGO_URI;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import Admin from "../models/Admin.js";

// const createAdmin = async () => {
//   await mongoose.connect(MONGO_URI);

//   const existing = await Admin.findOne({ email: EMAIL_USER });
//   if (existing) {
//     console.log("Admin already exists");
//     return process.exit();
//   }

//   const hashedPassword = await bcrypt.hash(EMAIL_PASS, 10);

//   await Admin.create({
//     name: "RS Enterprises",
//     email: EMAIL_USER,
//     password: hashedPassword,
//   });

//   console.log("✅ Admin created successfully");
//   process.exit();
// };

// createAdmin();
