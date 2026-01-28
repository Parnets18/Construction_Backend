import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },       // naya field
  paragraph: { type: String },  // naya field
  image: { type: String },      // image ka naam/URL
});

const About = mongoose.model("About", aboutSchema);

export default About;
