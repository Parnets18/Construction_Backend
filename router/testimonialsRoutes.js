import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/testimonialsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/", getTestimonials);
router.post("/", upload.single("profilePic"), createTestimonial);
router.put("/:id", upload.single("profilePic"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
