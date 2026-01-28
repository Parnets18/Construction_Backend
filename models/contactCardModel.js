import mongoose from "mongoose";

const contactCardSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true,
      enum: ["phone", "email", "address"]
    },
    value: { 
      type: String, 
      required: true 
    },
    icon: { 
      type: String, 
      required: true,
      enum: ["phone", "email", "location"],
      default: "phone"
    }
  },
  { timestamps: true }
);

const ContactCard = mongoose.model("ContactCard", contactCardSchema);

export default ContactCard;