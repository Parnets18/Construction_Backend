import Admin from "../models/loginModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Admin (optional)
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ success: false, message: "Admin already exists" });

    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // JWT token generate
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
