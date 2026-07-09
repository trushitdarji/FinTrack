import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import transactionRoute from "./routes/transaction.route.js";
import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api", transactionRoute);

app.get("/", (req, res) => {
  res.json({ messaege: "FinTrack API is running" });
});

app.use(errorHandler);

export default app;
