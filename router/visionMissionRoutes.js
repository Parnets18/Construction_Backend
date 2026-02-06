import express from "express";
import {
  getVisionMission,
  getVisionMissionById,
  createVisionMission,
  updateVisionMission,
  deleteVisionMission,
} from "../controller/visionMissionController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/", getVisionMission);
router.get("/:id", getVisionMissionById);
router.post("/", upload.array("images", 4), createVisionMission);
router.put("/:id", upload.array("images", 4), updateVisionMission);
router.delete("/:id", deleteVisionMission);

export default router;
