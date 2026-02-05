import mongoose from "mongoose";

// Clear any existing model to avoid schema conflicts
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, required: true },
    landArea: { type: String }, // Land area in sq.ft (optional)
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  { 
    timestamps: true,
    strict: true // Ensure only defined fields are saved
  }
);

export default mongoose.model("Project", projectSchema);