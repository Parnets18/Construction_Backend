import express from "express";

import {
  getServices,
  getServiceById, // 👈 new controller
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import multer from "multer";
const router = express.Router();

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services"); // folder banake rakhna
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.get("/", getServices); // Get all services
router.get("/:id", getServiceById); // Get service by ID 👈
router.post("/", upload.array("images", 5), createService);
router.put("/:id", upload.array("images", 5), updateService);
router.delete("/:id", deleteService);

export default router;
