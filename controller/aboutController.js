import About from "../models/aboutModel.js";

// ✅ Create About
export const createAbout = async (req, res) => {
  try {
    const { title, text, paragraph } = req.body;
    const image = req.file ? req.file.filename : null;

    const newAbout = new About({ image, title, text, paragraph });
    await newAbout.save();

    res.status(201).json(newAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All About with Pagination
export const getAbout = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // Default page 1
    const limit = parseInt(req.query.limit) || 5;    // Default 5 items per page
    const skip = (page - 1) * limit;

    const totalItems = await About.countDocuments(); 
    const abouts = await About.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      items: abouts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update About
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, paragraph } = req.body;

    let updateData = { title, text, paragraph };
    if (req.file) updateData.image = req.file.filename;

    const updated = await About.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "About not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete About
export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await About.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "About not found" });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
