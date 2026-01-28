import express from "express";

import {
  getVisionMission,
  createVisionMission,
  updateVisionMission,
  deleteVisionMission,
} from "../controller/visionMissionController.js";
import multer from "multer";
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/vision-mission"); // folder manually create karein
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getVisionMission);
router.post("/", upload.array("images", 4), createVisionMission);
router.put("/:id", upload.array("images", 4), updateVisionMission);
router.delete("/:id", deleteVisionMission);

export default router;
