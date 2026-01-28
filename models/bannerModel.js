import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    // Multiple videos
    videos: [
      {
        type: String,
      },
    ],
    // Multiple images
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    altText: {
      type: String,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    linkUrl: {
      type: String,
      trim: true,
    },
    linkTarget: {
      type: String,
      enum: ["_self", "_blank"],
      default: "_self",
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
