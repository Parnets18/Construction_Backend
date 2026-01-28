import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/testimonialsController.js";
import multer from "multer";
import path from "path";

// Configure multer for profile picture upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/testimonials"); // folder to store images
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

const router = express.Router();

// Routes
router.get("/", getTestimonials);
router.post("/", upload.single("profilePic"), createTestimonial);
router.put("/:id", upload.single("profilePic"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
