import express from "express";
import {
  createMedia,
  getMedia,
  getMediaItem,
  updateMedia,
  deleteMedia,
} from "../controller/videoController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// Multiple file upload for both images and videos
router.post("/", upload.array("media", 10), createMedia);
router.get("/", getMedia);
router.get("/:id", getMediaItem);
router.put("/:id", upload.array("media", 10), updateMedia);
router.delete("/:id", deleteMedia);

export default router;
