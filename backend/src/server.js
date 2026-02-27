
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import initializeDatabase from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";


dotenv.config();


initializeDatabase();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);


app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json());


app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "CourseHub API" });
});


app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CourseHub API → http://localhost:${PORT}`);
});
