import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    if (!courseName || !courseDescription || !instructor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      courseName,
      courseDescription,
      instructor,
      createdBy: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Course.findOneAndDelete({ _id: id, createdBy: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
