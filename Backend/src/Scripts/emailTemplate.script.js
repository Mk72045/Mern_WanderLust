const emailTemplate = (otp, time) => {
  return `
        <div style="font-family: Arial, sans-serif; padding:20px">
        <h2>SecureAuth</h2>

        <p>Your One-Time Password (OTP) is:</p>

        <h1 style="letter-spacing:4px;color:#1976d2">
          ${otp}
        </h1>

        <p>This OTP will expire in <strong>${time} minutes</strong>.</p>

        <hr/>

        <small>
          If you did not request this login, please ignore this email.
        </small>
      </div>
    `;
};

export default emailTemplate;
