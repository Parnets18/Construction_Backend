import VisionMission from "../models/visionMissionModel.js";
import mongoose from "mongoose";

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
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const data = await VisionMission.findById(id);
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
    const { id } = req.params;
    const { title, paragraph } = req.body;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    // First, get the existing entry to preserve images if no new ones are uploaded
    const existingEntry = await VisionMission.findById(id);
    if (!existingEntry) {
      return res.status(404).json({ error: "Vision/Mission entry not found" });
    }

    const updateData = { title, paragraph };

    // Only update images if new files are uploaded, otherwise keep existing images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    } else {
      // Keep existing images
      updateData.images = existingEntry.images;
    }

    const updated = await VisionMission.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Error updating vision/mission entry:", err);
    console.error("Request body:", req.body);
    console.error("Request files:", req.files);
    console.error("Request params:", req.params);
    res.status(500).json({ error: "Failed to update vision/mission entry", details: err.message });
  }
};

// DELETE
export const deleteVisionMission = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const deleted = await VisionMission.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Vision/Mission entry not found" });
    }
    
    res.json({ success: true, message: "Vision/Mission entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting vision/mission entry:", err);
    console.error("Request params:", req.params);
    res.status(500).json({ error: "Failed to delete vision/mission entry", details: err.message });
  }
};
