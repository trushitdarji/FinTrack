import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import transactionRoute from "./routes/transaction.route.js";
import authMiddleware from "./middleware/auth.middleware.js";
import dashboardRoute from "./routes/dashboard.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api", transactionRoute);

app.use("/api/dashboard", dashboardRoute);

app.get("/", (req, res) => {
  res.json({ messaege: "FinTrack API is running" });
});

app.use(errorHandler);

export default app;
