import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import aboutRoutes from "./router/aboutRoutes.js";
import serviceRoutes from "./router/serviceRoutes.js";
import contactRoutes from "./router/contactRoutes.js";
import visionMissionRoutes from "./router/visionMissionRoutes.js";
import bannerRoutes from "./router/bannerRoutes.js";
import contactCardRoutes from "./router/contactCardRoutes.js";
import testimonialRoutes from "./router/testimonialsRoutes.js";
import loginRoutes from "./router/loginRoutes.js";
import videoRoutes from "./router/videoRoutes.js";

dotenv.config();
const app = express();

// ES Module me __dirname define karna
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Static folders
// Banner images

// Video uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads/about",
  express.static(path.join(__dirname, "uploads/about"))
);
app.use(
  "/uploads/testimonials",
  express.static(path.join(__dirname, "uploads/testimonials"))
);
app.use("/banner", express.static(path.join(__dirname, "upload/banner")));

// app.use("/services", express.static(path.join(__dirname, "uploads/services")));
// Routes
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/vision-Mission", visionMissionRoutes);
app.use("/api/banners", bannerRoutes);
// app.use("/api/contactcards", contactCardRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", loginRoutes);
app.use("/api/videos", videoRoutes);

// Test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Simple contactcards route for testing
app.get("/api/contactcards", (req, res) => {
  res.json({ message: "Contact cards endpoint is working!", data: [] });
});

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
