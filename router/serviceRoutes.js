import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", upload.array("images", 5), createService);
router.put("/:id", upload.array("images", 5), updateService);
router.delete("/:id", deleteService);

export default router;
