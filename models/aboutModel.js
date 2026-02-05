import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  stats: [{
    number: { type: String, required: true },
    label: { type: String, required: true },
    suffix: { type: String, default: "+" }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const About = mongoose.model("About", aboutSchema);

export default About;
