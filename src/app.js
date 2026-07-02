import express from "express";

const app = express();

app.use(express());

app.get("/", (req, res) => {
  res.json({ messaege: "FinTrack API is running" });
});

export default app;
