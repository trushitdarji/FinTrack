import express from "express"
import authController from "../controller/auth.controller.js"

const authRoute = express.Router();

authRoute.post("/register",authController.RegisterController);

export default authRoute;