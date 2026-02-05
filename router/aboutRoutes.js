import express from "express";
import multer from "multer";
import {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
  getAllAbout,
} from "../controller/aboutController.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/about");
  },
  filename: (req, file, cd) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cd(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Routes
router.post("/", upload.single("image"), createAbout);
router.get("/", getAbout); // Get active about section for frontend
router.get("/all", getAllAbout); // Get all about sections for admin
router.get("/:id", getAboutById); // Get specific about section
router.put("/:id", upload.single("image"), updateAbout);
router.delete("/:id", deleteAbout);

export default router;
