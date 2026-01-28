import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controller/bannerController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads/banner");

const router = express.Router();

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_")),
});

// File filter to accept videos and images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("video/") ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only video and image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter,
});

// Debug middleware
const debugFileUpload = (req, res, next) => {
  console.log("📁 File upload request:", {
    body: req.body,
    files:
      req.files?.map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      })) || "No files",
  });
  next();
};

// Routes
router.get("/", getBanners);

// Upload multiple files: videos and images in one request
router.post("/", upload.array("files", 10), debugFileUpload, createBanner);
router.put("/:id", upload.array("files", 10), debugFileUpload, updateBanner);
router.delete("/:id", deleteBanner);

// Error handling middleware
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File too large",
      error: "File size should be less than 100MB",
    });
  }
  res.status(400).json({ message: "Upload failed", error: error.message });
});

export default router;
