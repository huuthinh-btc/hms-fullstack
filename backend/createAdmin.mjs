import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model/userModel.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const exists = await User.findOne({ email: "admin@gmail.com" });
    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

createAdmin();
