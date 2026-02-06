import mongoose from "mongoose";

const mediaBannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] }, // Array of image paths
  },
  { 
    timestamps: true,
    strict: true // Enforce schema
  }
);

// Use "MediaBanner" model name to avoid conflict with existing Banner model
export default mongoose.models.MediaBanner || mongoose.model("MediaBanner", mediaBannerSchema);