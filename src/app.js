import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute)

app.get("/", (req, res) => {
  res.json({ messaege: "FinTrack API is running" });
});

export default app;
