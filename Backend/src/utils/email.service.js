import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(to, resetLink) {
  await transporter.sendMail({
    from: `"FinTrack" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "FinTrack - Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Reset Your FinTrack Password</h2>

        <p>
          We received a request to reset your FinTrack account password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This link will expire in 15 minutes.
        </p>

        <p>
          If you didn't request a password reset, you can safely ignore this email.
        </p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          FinTrack
        </p>
      </div>
    `,
  });
}
