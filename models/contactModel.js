import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    phone: { type: String }, // Changed from array to string
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contacts", contactSchema);

export default Contact;
