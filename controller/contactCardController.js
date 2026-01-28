import ContactCard from "../models/contactCardModel.js";

// GET all contact cards
export const getContactCards = async (req, res) => {
  try {
    const contactCards = await ContactCard.find().sort({ createdAt: -1 });
    res.json(contactCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact cards", error: error.message });
  }
};

// CREATE new contact card
export const createContactCard = async (req, res) => {
  try {
    const { title, type, value, icon } = req.body;

    // Validation
    if (!title || !type || !value || !icon) {
      return res.status(400).json({ 
        message: "All fields are required: title, type, value, icon" 
      });
    }

    const newContactCard = new ContactCard({
      title,
      type,
      value,
      icon
    });

    const saved = await newContactCard.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact card", error: error.message });
  }
};

// UPDATE contact card
export const updateContactCard = async (req, res) => {
  try {
    const { title, type, value, icon } = req.body;

    // Validation
    if (!title || !type || !value || !icon) {
      return res.status(400).json({ 
        message: "All fields are required: title, type, value, icon" 
      });
    }

    const updated = await ContactCard.findByIdAndUpdate(
      req.params.id,
      { title, type, value, icon },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating contact card", error: error.message });
  }
};

// DELETE contact card
export const deleteContactCard = async (req, res) => {
  try {
    const deleted = await ContactCard.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.json({ message: "Contact card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact card", error: error.message });
  }
};

// GET single contact card by ID
export const getContactCardById = async (req, res) => {
  try {
    const contactCard = await ContactCard.findById(req.params.id);
    
    if (!contactCard) {
      return res.status(404).json({ message: "Contact card not found" });
    }

    res.json(contactCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact card", error: error.message });
  }
};