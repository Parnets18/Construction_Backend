import MediaBanner from "../models/Video.js";

// CREATE - Only images
export const createMedia = async (req, res) => {
  try {
    console.log("========= CREATE BANNER REQUEST =========");
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    
    const { title, description } = req.body;

    // Get image paths from uploaded files
    const images = req.files ? req.files.map((file) => file.filename) : [];

    if (images.length === 0) {
      console.log("No images provided");
      return res.status(400).json({ message: "At least one image is required" });
    }

    console.log("Creating banner with images:", images);

    const newBanner = new MediaBanner({
      title,
      description,
      images,
    });

    await newBanner.save();
    console.log("Banner created successfully:", newBanner);
    res.status(201).json(newBanner);
  } catch (err) {
    console.error("Error creating banner:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getMedia = async (req, res) => {
  try {
    const banners = await MediaBanner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getMediaItem = async (req, res) => {
  try {
    const banner = await MediaBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateMedia = async (req, res) => {
  try {
    console.log("========= UPDATE BANNER REQUEST =========");
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    console.log("Banner ID:", req.params.id);
    
    const { title, description } = req.body;

    // Build update data with only the fields we want
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    // If new images are uploaded, update them
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
      console.log("New images uploaded:", updateData.images);
    } else {
      console.log("No new images uploaded");
    }

    console.log("Update data being sent:", updateData);

    const updatedBanner = await MediaBanner.findByIdAndUpdate(
      req.params.id,
      { $set: updateData }, // Use $set to explicitly update only these fields
      { new: true, runValidators: true }
    );

    if (!updatedBanner) {
      console.log("Banner not found with ID:", req.params.id);
      return res.status(404).json({ message: "Banner not found" });
    }
    
    console.log("Banner updated successfully:", updatedBanner);
    res.status(200).json(updatedBanner);
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteMedia = async (req, res) => {
  try {
    const deletedBanner = await MediaBanner.findByIdAndDelete(req.params.id);
    if (!deletedBanner)
      return res.status(404).json({ message: "Banner not found" });
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
