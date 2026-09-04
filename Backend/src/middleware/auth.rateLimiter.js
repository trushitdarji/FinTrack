import rateLimit from "express-rate-limit";

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5, // Maximum 5 requests in 15 minutes

  message: {
    success: false,
    message: "Too many password reset requests. Please try after sometime.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export default forgotPasswordLimiter;
