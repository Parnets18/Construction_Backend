import About from "../models/aboutModel.js";

// ✅ Create About
export const createAbout = async (req, res) => {
  try {
    const { title, description, stats } = req.body;
    const image = req.file ? req.file.filename : null;

    // Parse JSON strings if they come as strings
    const parsedStats = typeof stats === 'string' ? JSON.parse(stats) : stats;

    const newAbout = new About({ 
      title, 
      description, 
      image, 
      stats: parsedStats || []
    });
    
    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get About for frontend
export const getAbout = async (req, res) => {
  try {
    const abouts = await About.find({ isActive: true }).sort({ createdAt: -1 });
    
    // Return the first active about section or empty structure
    if (abouts.length > 0) {
      res.status(200).json(abouts[0]);
    } else {
      res.status(200).json({
        title: "Our Story",
        description: "Our journey began with a simple belief — quality construction builds long-lasting trust. What started as a small operation has grown into a trusted construction partner for diverse projects.",
        stats: [
          { number: "500", label: "Projects Delivered", suffix: "+" },
          { number: "15", label: "Years of Experience", suffix: "+" },
          { number: "100", label: "Satisfied Clients", suffix: "+" },
          { number: "50", label: "Skilled Professionals", suffix: "+" }
        ],
        image: null
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get About by ID
export const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);
    
    if (!about) {
      return res.status(404).json({ error: "About section not found" });
    }
    
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update About
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, stats } = req.body;

    let updateData = { title, description };
    
    if (req.file) updateData.image = req.file.filename;
    
    // Parse JSON strings if they come as strings
    if (stats) {
      updateData.stats = typeof stats === 'string' ? JSON.parse(stats) : stats;
    }

    const updated = await About.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ error: "About section not found" });

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

    if (!deleted) return res.status(404).json({ error: "About section not found" });

    res.status(200).json({ message: "About section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All About Sections (for admin)
export const getAllAbout = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await About.countDocuments();
    const abouts = await About.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      data: abouts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
