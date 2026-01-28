import Testimonial from "../models/testimonialsModel.js";

// GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error });
  }
};

// CREATE testimonials
export const createTestimonial = async (req, res) => {
  try {
    const { rating, paragraph, name, designation } = req.body;
    let profilePic = "";

    // If using multer to upload image
    if (req.file) {
      profilePic = req.file.filename;
    }

    const newTestimonial = new Testimonial({
      rating,
      paragraph,
      name,
      designation,
      profilePic,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error creating testimonial", error });
  }
};

// UPDATE testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const id = req.params.id;
    const { rating, paragraph, name, designation } = req.body;
    let updateData = { rating, paragraph, name, designation };

    if (req.file) {
      updateData.profilePic = req.file.filename;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error });
  }
};

// DELETE testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const id = req.params.id;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial", error });
  }
};
