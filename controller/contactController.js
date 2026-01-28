import Contact from "../models/contactModel.js";

// GET all contacts
// Enhanced backend controller for contacts with pagination and filters

export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, dateFilter = "all", search = "" } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query object
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    // Date filtering
    const now = new Date();
    let startDate;

    switch (dateFilter) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        query.createdAt = { $gte: startDate };
        break;

      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        );
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        query.createdAt = { $gte: startDate, $lt: endDate };
        break;

      case "last7days":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        query.createdAt = { $gte: startDate };
        break;

      case "last30days":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 30);
        query.createdAt = { $gte: startDate };
        break;

      case "last3months":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 3);
        query.createdAt = { $gte: startDate };
        break;

      case "last6months":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 6);
        query.createdAt = { $gte: startDate };
        break;

      case "lastyear":
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        query.createdAt = { $gte: startDate };
        break;

      case "all":
      default:
        // No date filter
        break;
    }

    // Get total count for pagination
    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limitNum);

    // Fetch contacts with pagination and sorting
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limitNum)
      .select("title email phone subject message createdAt") // Select specific fields
      .lean(); // Use lean() for better performance

    // Response with pagination info
    res.json({
      contacts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalContacts,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum,
      },
      // For backward compatibility
      totalPages,
      totalContacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

// Optional: Add a function to get contact statistics
export const getContactStats = async (req, res) => {
  try {
    const now = new Date();

    // Get various time period stats
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(now);
    lastMonth.setDate(lastMonth.getDate() - 30);

    const stats = {
      total: await Contact.countDocuments(),
      today: await Contact.countDocuments({ createdAt: { $gte: today } }),
      lastWeek: await Contact.countDocuments({ createdAt: { $gte: lastWeek } }),
      lastMonth: await Contact.countDocuments({
        createdAt: { $gte: lastMonth },
      }),
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    res.status(500).json({
      message: "Error fetching contact statistics",
      error: error.message,
    });
  }
};

// CREATE new contact
export const createContact = async (req, res) => {
  try {
    const { title, phone, email, subject, message } = req.body;
    const newContact = new Contact({ title, phone, email, subject, message });
    const saved = await newContact.save();
    res.status().json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact", error });
  }
};

// UPDATE contact
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating contact", error });
  }
};

// DELETE contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};
