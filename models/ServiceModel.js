import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    paragraph: { type: String },
    features: { type: [String], default: [] }, // Array of features
    images: { type: [String], default: [] },   // Array of image filenames
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);


