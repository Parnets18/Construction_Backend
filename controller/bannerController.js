import Banner from "../models/bannerModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads/banner");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// GET all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banners", error: error.message });
  }
};

// CREATE banner
export const createBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      status,
      altText,
      displayOrder,
      linkUrl,
      linkTarget,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least one file (video or image)" });
    }

    const videos = [];
    const images = [];

    req.files.forEach((file) => {
      if (file.mimetype.startsWith("video")) videos.push(file.filename);
      else if (file.mimetype.startsWith("image")) images.push(file.filename);
    });

    const newBanner = new Banner({
      title,
      subtitle,
      videos,
      images,
      status: status || "active",
      altText,
      displayOrder,
      linkUrl,
      linkTarget,
    });

    const savedBanner = await newBanner.save();
    res.status(201).json({ message: "Banner created successfully", banner: savedBanner });
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        const filePath = path.join(uploadsDir, file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    res.status(400).json({ message: "Error creating banner", error: error.message });
  }
};

// UPDATE banner
export const updateBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      status,
      altText,
      displayOrder,
      linkUrl,
      linkTarget,
    } = req.body;

    const updateData = { title, subtitle, status, altText, displayOrder, linkUrl, linkTarget };

    if (req.files && req.files.length > 0) {
      const existingBanner = await Banner.findById(req.params.id);
      if (!existingBanner) {
        // Delete uploaded files if banner not found
        req.files.forEach((file) => {
          const filePath = path.join(uploadsDir, file.filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
        return res.status(404).json({ message: "Banner not found" });
      }

      // Delete old videos
      existingBanner.videos.forEach((video) => {
        const videoPath = path.join(uploadsDir, video);
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
      });

      // Delete old images
      existingBanner.images.forEach((image) => {
        const imagePath = path.join(uploadsDir, image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });

      // Separate new files into videos and images
      const videos = [];
      const images = [];
      req.files.forEach((file) => {
        if (file.mimetype.startsWith("video")) videos.push(file.filename);
        else if (file.mimetype.startsWith("image")) images.push(file.filename);
      });

      updateData.videos = videos;
      updateData.images = images;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        const filePath = path.join(uploadsDir, file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    res.status(400).json({ message: "Error updating banner", error: error.message });
  }
};

// DELETE banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    // Delete videos
    banner.videos.forEach((video) => {
      const videoPath = path.join(uploadsDir, video);
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    });

    // Delete images
    banner.images.forEach((image) => {
      const imagePath = path.join(uploadsDir, image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    });

    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: "Banner deleted successfully", deletedBanner: banner });
  } catch (error) {
    res.status(500).json({ message: "Error deleting banner", error: error.message });
  }
};
