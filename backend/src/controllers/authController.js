import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registered successfully",
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
