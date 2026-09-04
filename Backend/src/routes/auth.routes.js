import express from "express";
import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", authController.RegisterController);
authRoute.post("/login", authController.LoginController);
authRoute.post("/logout", authMiddleware, authController.LogoutController);
authRoute.get("/me", authMiddleware, authController.GetMeController);
authRoute.post(
  "/change-password",
  authMiddleware,
  authController.ChangePasswordController,
);
authRoute.post("/forgot-password", authController.ForgotPasswordController);
authRoute.post(
  "/reset-password/:token",
  authController.ResetPasswordController,
);

export default authRoute;
