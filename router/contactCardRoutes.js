import express from "express";
import {
  getContactCards,
  createContactCard,
  updateContactCard,
  deleteContactCard,
  getContactCardById
} from "../controller/contactCardController.js";

const router = express.Router();

// GET all contact cards
router.get("/", getContactCards);

// GET single contact card by ID
router.get("/:id", getContactCardById);

// CREATE new contact card
router.post("/", createContactCard);

// UPDATE contact card
router.put("/:id", updateContactCard);

// DELETE contact card
router.delete("/:id", deleteContactCard);

export default router;