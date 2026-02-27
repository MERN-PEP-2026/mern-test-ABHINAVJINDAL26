import express from "express";
import { createCourse, deleteCourse, getCourses } from "../controllers/courseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getCourses);
router.delete("/:id", protect, deleteCourse);

export default router;
