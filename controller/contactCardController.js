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
    const { title, type, phone, email, address } = req.body;

    // Validation
    if (!title || !type) {
      return res.status(400).json({ 
        message: "Title and type are required" 
      });
    }

    // Type-specific validation
    if (type === "phone" && (!phone || phone.length === 0 || phone.some(p => !p.trim()))) {
      return res.status(400).json({ 
        message: "At least one phone number is required for phone type" 
      });
    }

    if (type === "email" && (!email || email.length === 0 || email.some(e => !e.trim()))) {
      return res.status(400).json({ 
        message: "At least one email address is required for email type" 
      });
    }

    if (type === "address" && (!address || !address.trim())) {
      return res.status(400).json({ 
        message: "Address is required for address type" 
      });
    }

    const newContactCard = new ContactCard({
      title,
      type,
      phone: type === "phone" ? phone : [],
      email: type === "email" ? email : [],
      address: type === "address" ? address : ""
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
    const { title, type, phone, email, address } = req.body;

    // Validation
    if (!title || !type) {
      return res.status(400).json({ 
        message: "Title and type are required" 
      });
    }

    // Type-specific validation
    if (type === "phone" && (!phone || phone.length === 0 || phone.some(p => !p.trim()))) {
      return res.status(400).json({ 
        message: "At least one phone number is required for phone type" 
      });
    }

    if (type === "email" && (!email || email.length === 0 || email.some(e => !e.trim()))) {
      return res.status(400).json({ 
        message: "At least one email address is required for email type" 
      });
    }

    if (type === "address" && (!address || !address.trim())) {
      return res.status(400).json({ 
        message: "Address is required for address type" 
      });
    }

    const updated = await ContactCard.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        type, 
        phone: type === "phone" ? phone : [],
        email: type === "email" ? email : [],
        address: type === "address" ? address : ""
      },
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