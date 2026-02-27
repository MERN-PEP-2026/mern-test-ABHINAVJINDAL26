
import express from "express";
import { addCourse, listCourses, removeCourse } from "../controllers/courseController.js";
import verifyAccess from "../middleware/authMiddleware.js";

const courseRouter = express.Router();

courseRouter.post("/", verifyAccess, addCourse);
courseRouter.get("/", verifyAccess, listCourses);
courseRouter.delete("/:id", verifyAccess, removeCourse);

export default courseRouter;
