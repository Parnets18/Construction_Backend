import mongoose from "mongoose";

const contactCardSchema = new mongoose.Schema(
  {
    phone: { 
      type: String, 
      required: true
    },
    email: { 
      type: String, 
      required: true
    },
    address: { 
      type: String, 
      required: true
    }
  },
  { timestamps: true }
);

const ContactCard = mongoose.model("ContactCard", contactCardSchema);

export default ContactCard;