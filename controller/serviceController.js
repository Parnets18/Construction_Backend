import Service from "../models/ServiceModel.js";

// 🔹 Helper function for features parsing
const parseFeatures = (features) => {
  if (!features) return [];
  try {
    if (Array.isArray(features)) return features;        // already array
    if (typeof features === "string") return JSON.parse(features); // stringified JSON
    return [];
  } catch {
    return [];
  }
};

// 🔹 Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// 🔹 Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error("Error fetching service by ID:", err);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// 🔹 Create new service
export const createService = async (req, res) => {
  try {
    const { title, description, text, paragraph, details, features } = req.body;

    const featureArray = parseFeatures(features);
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const newService = new Service({
      title,
      description,
      text,
      paragraph,
      details,
      features: featureArray,
      images,
    });

    await newService.save();
    res.json(newService);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// 🔹 Update service
export const updateService = async (req, res) => {
  try {
    const { title, description, text, paragraph, details, features } = req.body;

    const featureArray = parseFeatures(features);

    let updateData = {
      title,
      description,
      text,
      paragraph,
      details,
      features: featureArray,
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// 🔹 Delete service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
};
