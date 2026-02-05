import Project from "../models/projectModel.js";

// 🔹 Helper function for features parsing
const parseFeatures = (features) => {
  if (!features) return [];
  try {
    if (Array.isArray(features)) return features;
    if (typeof features === "string") return JSON.parse(features);
    return [];
  } catch {
    return [];
  }
};

// 🔹 Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// 🔹 Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error("Error fetching project by ID:", err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// 🔹 Create new project
export const createProject = async (req, res) => {
  console.log("=== CREATE PROJECT REQUEST ===");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  
  try {
    const { 
      title, 
      description, 
      location, 
      year, 
      landArea,
      features 
    } = req.body;

    console.log("Extracted fields:", {
      title,
      description,
      location,
      year,
      landArea,
      features
    });

    if (!title || !description || !location || !year) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["title", "description", "location", "year"],
        received: { title, description, location, year }
      });
    }

    const featureArray = parseFeatures(features);
    const images = req.files ? req.files.map((file) => file.filename) : [];

    console.log("Processed data:", {
      title,
      description,
      location,
      year,
      landArea,
      features: featureArray,
      images
    });

    const projectData = {
      title,
      description,
      location,
      year,
      landArea: landArea || undefined,
      features: featureArray,
      images,
    };

    console.log("Creating project with data:", projectData);

    const newProject = new Project(projectData);
    
    console.log("Project instance created, attempting to save...");
    
    const savedProject = await newProject.save();
    
    console.log("Project saved successfully:", savedProject);
    res.json(savedProject);
  } catch (err) {
    console.error("=== ERROR CREATING PROJECT ===");
    console.error("Error:", err);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("Error name:", err.name);
    
    if (err.name === 'ValidationError') {
      console.error("Validation errors:", err.errors);
      return res.status(400).json({ 
        error: "Validation failed", 
        details: err.message,
        validationErrors: err.errors
      });
    }
    
    res.status(500).json({ 
      error: "Failed to create project", 
      details: err.message,
      errorName: err.name,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// 🔹 Update project
export const updateProject = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      location, 
      year, 
      landArea,
      features 
    } = req.body;

    const featureArray = parseFeatures(features);

    let updateData = {
      title,
      description,
      location,
      year,
      landArea: landArea || undefined, // Optional
      features: featureArray,
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// 🔹 Delete project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};