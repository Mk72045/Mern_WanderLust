import dotenv from "dotenv";
dotenv.config();

// ========== dotenv file data ==========
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES;

// ========== packages ==========
import axios from "axios";

// ========== files and functions importing ==========
import emailTemplate from "../scripts/emailTemplate.script.js";

const sendOTP = async (email, otp) => {
  try {
    const html = emailTemplate(otp, OTP_EXPIRY_MINUTES);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "WanderLust SecureAuth",
          email: BREVO_SENDER_EMAIL,
        },

        to: [
          {
            email: email,
          },
        ],

        subject: "Your WanderLust OTP",

        htmlContent: html,

        textContent: `Your WanderLust OTP is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("BREVO EMAIL ERROR:", error.response?.data || error.message);

    throw error;
  }
};

export default sendOTP;
