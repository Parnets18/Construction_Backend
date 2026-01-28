import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    text: { type: String },
    paragraph: { type: String },
    details: { type: String },
    features: { type: [String], default: [] }, // Array of features
    images: { type: [String], default: [] },   // Array of image filenames
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);


