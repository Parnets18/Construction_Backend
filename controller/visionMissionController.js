import VisionMission from "../models/visionMissionModel.js";

// GET all
export const getVisionMission = async (req, res) => {
  try {
    const data = await VisionMission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching vision/mission data:", err);
    res.status(500).json({ error: "Failed to fetch vision/mission data", details: err.message });
  }
};

// GET by ID
export const getVisionMissionById = async (req, res) => {
  try {
    const data = await VisionMission.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Vision/Mission entry not found" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error fetching vision/mission entry by ID:", err);
    res.status(500).json({ error: "Failed to fetch vision/mission entry", details: err.message });
  }
};

// CREATE new
export const createVisionMission = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const images = req.files ? req.files.map((file) => file.filename) : [];

    if (!title || !paragraph) {
      return res.status(400).json({ error: "Title and paragraph are required" });
    }

    const newEntry = new VisionMission({ title, paragraph, images });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    console.error("Error creating vision/mission entry:", err);
    res.status(500).json({ error: "Failed to create vision/mission entry", details: err.message });
  }
};

// UPDATE
export const updateVisionMission = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const updateData = { title, paragraph };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const updated = await VisionMission.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Vision/Mission entry not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating vision/mission entry:", err);
    res.status(500).json({ error: "Failed to update vision/mission entry", details: err.message });
  }
};

// DELETE
export const deleteVisionMission = async (req, res) => {
  try {
    const deleted = await VisionMission.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Vision/Mission entry not found" });
    }
    
    res.json({ success: true, message: "Vision/Mission entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting vision/mission entry:", err);
    res.status(500).json({ error: "Failed to delete vision/mission entry", details: err.message });
  }
};
