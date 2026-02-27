
import mongoose from "mongoose";

const initializeDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is missing in environment variables");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`DB ready → ${conn.connection.host}`);
  } catch (err) {
    console.error("DB init failed:", err.message);
    process.exit(1);
  }
};

export default initializeDatabase;
