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
    phone: [{ 
      type: String 
    }],
    email: [{ 
      type: String 
    }],
    address: { 
      type: String 
    }
  },
  { timestamps: true }
);

const ContactCard = mongoose.model("ContactCard", contactCardSchema);

export default ContactCard;