import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactStats,
} from "../controller/contactController.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/stats", getContactStats);
export default router;
