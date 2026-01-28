import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    paragraph: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    profilePic: { type: String }, // optional
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
