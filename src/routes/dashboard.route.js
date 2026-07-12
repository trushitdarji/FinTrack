import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import dashboardController from "../controller/dashboard.controller.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/summary",authMiddleware,dashboardController.DashboardSummaryController);
dashboardRoute.get("/recent",authMiddleware,dashboardController.RecentController);

export default dashboardRoute

