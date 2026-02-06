import express from "express";
import {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
  getAllAbout,
} from "../controller/aboutController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.post("/", upload.single("image"), createAbout);
router.get("/", getAbout); // Get active about section for frontend
router.get("/all", getAllAbout); // Get all about sections for admin
router.get("/:id", getAboutById); // Get specific about section
router.put("/:id", upload.single("image"), updateAbout);
router.delete("/:id", deleteAbout);

export default router;
