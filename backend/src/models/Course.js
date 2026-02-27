/*
 * CourseModel.js — schema for academic courses
 * Each course is linked to the student who created it
 */
import mongoose from "mongoose";

const courseBlueprint = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  courseDescription: { type: String, required: true, trim: true },
  instructor: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const CourseModel = mongoose.model("Course", courseBlueprint);

export default CourseModel;
