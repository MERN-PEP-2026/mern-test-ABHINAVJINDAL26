
import mongoose from "mongoose";

const studentBlueprint = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Student", studentBlueprint);

export default StudentModel;
