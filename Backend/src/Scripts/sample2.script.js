// // scripts/testEmail.js
// import dotenv from "dotenv";
// dotenv.config();

// import sendEmail from "../utils/sendEmail.js";

// console.log(process.env.EMAIL_USER);

// const test = async () => {
//   try {
//     await sendEmail({
//       to: process.env.EMAIL_USER,
//       subject: "Test Email",
//       html: "<p>If you see this, Nodemailer is working.</p>",
//     });
//     console.log("✅ Email sent successfully");
//   } catch (error) {
//     console.error("❌ Email failed:", error.message);
//   }
// };

// test();