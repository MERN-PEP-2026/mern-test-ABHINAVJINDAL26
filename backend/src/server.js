
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import initializeDatabase from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";


dotenv.config();


initializeDatabase();

const app = express();

const normalizeOrigin = (origin) => origin.replace(/\/$/, "");

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .map(normalizeOrigin)
  .filter(Boolean);


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || !allowedOrigins.length) {
        callback(null, true);
        return;
      }

      const requestOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
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
