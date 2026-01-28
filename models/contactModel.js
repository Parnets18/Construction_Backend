import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    title: { type: String,  },
    // type: { type: String },
    phone: [{ type: String }],
    email: { type: String },
    subject: { type: String },
    message: { type:String},
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contacts", contactSchema);

export default Contact;
