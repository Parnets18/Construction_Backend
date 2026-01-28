import VisionMission from "../models/visionMissionModel.js";

// GET all
export const getVisionMission = async (req, res) => {
  try {
    const data = await VisionMission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vision/mission data" });
  }
};

// CREATE new
export const createVisionMission = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const newEntry = new VisionMission({ title, paragraph, images });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to create vision/mission entry" });
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

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update vision/mission entry" });
  }
};

// DELETE
export const deleteVisionMission = async (req, res) => {
  try {
    await VisionMission.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete vision/mission entry" });
  }
};
