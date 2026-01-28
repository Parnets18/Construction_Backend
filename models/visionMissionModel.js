import mongoose from "mongoose";

const visionMissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    images: [{ type: String }], // multiple images
  },
  { timestamps: true }
);

export default mongoose.model("VisionMission", visionMissionSchema);
