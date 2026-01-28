import express from "express";
import { registerAdmin, loginAdmin } from "../controller/loginController.js";

const router = express.Router();

router.post("/register", registerAdmin); // optional
router.post("/login", loginAdmin);

export default router;
