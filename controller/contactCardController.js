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
    console.log("Received request body:", req.body); // Debug log
    const { phone, email, address } = req.body;

    // Validation
    if (!phone || !email || !address) {
      console.log("Validation failed:", { phone: !!phone, email: !!email, address: !!address }); // Debug log
      return res.status(400).json({ 
        message: "Phone number, email, and address are required" 
      });
    }

    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log("Email validation failed:", email); // Debug log
      return res.status(400).json({ 
        message: "Invalid email format" 
      });
    }

    const newContactCard = new ContactCard({
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    });

    const saved = await newContactCard.save();
    console.log("Contact card saved successfully:", saved); // Debug log
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in createContactCard:", error); // Debug log
    res.status(400).json({ message: "Error creating contact card", error: error.message });
  }
};

// UPDATE contact card
export const updateContactCard = async (req, res) => {
  try {
    const { phone, email, address } = req.body;

    // Validation
    if (!phone || !email || !address) {
      return res.status(400).json({ 
        message: "Phone number, email, and address are required" 
      });
    }

    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format" 
      });
    }

    const updated = await ContactCard.findByIdAndUpdate(
      req.params.id,
      { 
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim()
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