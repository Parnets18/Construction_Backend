import Media from "../models/Video.js"; // Make sure this path is correct

// CREATE
export const createMedia = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Separate files into images and videos
    const videos = [];
    const images = [];

    req.files.forEach((file) => {
      if (file.mimetype.startsWith("video/")) {
        videos.push(file.path);
      } else if (file.mimetype.startsWith("image/")) {
        images.push(file.path);
      }
    });

    // Determine media type
    let mediaType = "mixed";
    if (videos.length > 0 && images.length === 0) mediaType = "video";
    if (images.length > 0 && videos.length === 0) mediaType = "image";

    const newMedia = new Media({
      title,
      description,
      videos,
      images,
      mediaType,
    });
    await newMedia.save();

    res.status(201).json(newMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getMediaItem = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateMedia = async (req, res) => {
  try {
    const { title, description } = req.body;

    let videos = [];
    let images = [];
    let mediaType = "mixed";

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.mimetype.startsWith("video/")) {
          videos.push(file.path);
        } else if (file.mimetype.startsWith("image/")) {
          images.push(file.path);
        }
      });

      if (videos.length > 0 && images.length === 0) mediaType = "video";
      if (images.length > 0 && videos.length === 0) mediaType = "image";
    }

    const updatedMedia = await Media.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ...(req.files && { videos, images, mediaType }),
      },
      { new: true }
    );

    if (!updatedMedia)
      return res.status(404).json({ message: "Media not found" });
    res.status(200).json(updatedMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteMedia = async (req, res) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id);
    if (!deletedMedia)
      return res.status(404).json({ message: "Media not found" });
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
