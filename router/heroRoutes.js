// routes/HeroRoutes.js
import express from "express";
import {
     getHero, 
     createHero,
      updateHero, 
      deleteHero,

 } from "../controller/heroController.js";
import multer from "multer";
const router = express.Router();

// ✅ Multer configuration for hero images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/hero"); // uploads/hero folder exist hona chahiye
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now()+ "_"+ file.originalname;
    cd(null,uniqueName);
  },
});

const upload = multer({ storage: storage });

// ===== Routes =====
router.get("/", getHero);                      // GET all hero sections
router.post("/", upload.single("image"), createHero);  // POST new hero
router.put("/:id", upload.single("image"), updateHero); // UPDATE hero
router.delete("/:id", deleteHero);            // DELETE hero

export default router;
