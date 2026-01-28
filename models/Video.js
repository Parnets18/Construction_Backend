import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videos: { type: [String], default: [] }, // Array of video paths
    images: { type: [String], default: [] }, // Array of image paths
    mediaType: { type: String, enum: ["image", "video", "mixed"], default: "mixed" }
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);