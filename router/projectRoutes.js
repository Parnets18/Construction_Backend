import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", upload.array("images", 10), createProject);
router.put("/:id", upload.array("images", 10), updateProject);
router.delete("/:id", deleteProject);

export default router;