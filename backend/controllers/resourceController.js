const Resource = require("../models/Resource");

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// @desc    Create resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res) => {
  try {
    const { title, category, type, link, pdfLink, imageLink, description, tags } = req.body;

    if (!title || !category || !type) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and type are required",
      });
    }

    const resource = await Resource.create({
      title,
      category,
      type,
      link: link || "",
      pdfLink: pdfLink || "",
      imageLink: imageLink || "",
      description: description || "",
      tags: parseArrayField(tags),
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating resource",
      error: error.message,
    });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching resources",
      error: error.message,
    });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching resource",
      error: error.message,
    });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = async (req, res) => {
  try {
    const { title, category, type, link, pdfLink, imageLink, description, tags } = req.body;

    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        title: title || resource.title,
        category: category || resource.category,
        type: type || resource.type,
        link: link ?? resource.link,
        pdfLink: pdfLink ?? resource.pdfLink,
        imageLink: imageLink ?? resource.imageLink,
        description: description ?? resource.description,
        tags: tags !== undefined ? parseArrayField(tags) : resource.tags,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating resource",
      error: error.message,
    });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    await resource.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting resource",
      error: error.message,
    });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};