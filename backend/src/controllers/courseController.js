
import CourseModel from "../models/Course.js";

/* POST /api/courses — persist a new course entry */
export async function addCourse(req, res) {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    if (!courseName || !courseDescription || !instructor) {
      return res.status(400).json({ message: "Every field must be filled" });
    }

    const record = await CourseModel.create({
      courseName,
      courseDescription,
      instructor,
      createdBy: req.userId,
    });

    return res.status(201).json(record);
  } catch (exc) {
    console.error("addCourse →", exc.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/* GET /api/courses — retrieve all courses for the logged-in student */
export async function listCourses(req, res) {
  try {
    const records = await CourseModel.find({ createdBy: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json(records);
  } catch (exc) {
    console.error("listCourses →", exc.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/* DELETE /api/courses/:id — remove a specific course */
export async function removeCourse(req, res) {
  try {
    const targetId = req.params.id;

    const removed = await CourseModel.findOneAndDelete({
      _id: targetId,
      createdBy: req.userId,
    });

    if (!removed) {
      return res.status(404).json({ message: "Course not found or already removed" });
    }

    return res.status(200).json({ message: "Course removed successfully" });
  } catch (exc) {
    console.error("removeCourse →", exc.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
