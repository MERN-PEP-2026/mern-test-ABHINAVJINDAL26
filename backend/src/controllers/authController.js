
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import StudentModel from "../models/Student.js";


function mintToken(uid) {
  return jwt.sign({ userId: uid }, process.env.JWT_SECRET, { expiresIn: "7d" });
}


export async function register(req, res) {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in every field" });
    }

  
    const duplicate = await StudentModel.findOne({ email });
    if (duplicate) {
      return res.status(400).json({ message: "This email is already taken" });
    }

 
    const saltRounds = 10;
    const encryptedPwd = await bcrypt.hash(password, saltRounds);

    const freshStudent = await StudentModel.create({
      name,
      email,
      password: encryptedPwd,
    });

    return res.status(201).json({
      message: "Account created",
      token: mintToken(freshStudent._id),
      student: {
        id: freshStudent._id,
        name: freshStudent.name,
        email: freshStudent.email,
      },
    });
  } catch (exc) {
    console.error("register →", exc.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/* POST /api/auth/login — authenticate existing student */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    const foundStudent = await StudentModel.findOne({ email });
    if (!foundStudent) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    /* compare the submitted password against the stored hash */
    const passwordOk = await bcrypt.compare(password, foundStudent.password);
    if (!passwordOk) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    return res.status(200).json({
      message: "Signed in",
      token: mintToken(foundStudent._id),
      student: {
        id: foundStudent._id,
        name: foundStudent.name,
        email: foundStudent.email,
      },
    });
  } catch (exc) {
    console.error("login →", exc.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
