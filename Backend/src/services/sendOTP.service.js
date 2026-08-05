import dotenv from "dotenv";
dotenv.config();

// ========== dotenv file data ==========
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

// ========== packages ==========
import nodemailer from "nodemailer";

// ========== files and functions importing ==========
import emailTemplate from "../Scripts/emailTemplate.script.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: EMAIL_USER,
    to: email,
    html: emailTemplate(otp, OTP_EXPIRY_MINUTES),
  });
};

export default sendOTP;
