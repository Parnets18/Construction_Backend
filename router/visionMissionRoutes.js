import express from "express";
import fs from "fs";
import path from "path";

import {
  getVisionMission,
  getVisionMissionById,
  createVisionMission,
  updateVisionMission,
  deleteVisionMission,
} from "../controller/visionMissionController.js";
import multer from "multer";
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = "uploads/vision-mission";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Routes
router.get("/", getVisionMission);
router.get("/:id", getVisionMissionById);
router.post("/", upload.array("images", 4), createVisionMission);
router.put("/:id", upload.array("images", 4), updateVisionMission);
router.delete("/:id", deleteVisionMission);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ error: error.message });
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

export default router;
