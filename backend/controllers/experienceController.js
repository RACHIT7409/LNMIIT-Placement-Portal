const InterviewExperience = require("../models/InterviewExperience");

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// @desc    Submit interview experience
// @route   POST /api/experiences
// @access  Private
const createExperience = async (req, res) => {
  try {
    const { company, role, rounds, questionsAsked, tips } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required",
      });
    }

    const experience = await InterviewExperience.create({
      user: req.user._id,
      company,
      role,
      rounds: parseArrayField(rounds),
      questionsAsked: parseArrayField(questionsAsked),
      tips: tips || "",
    });

    res.status(201).json({
      success: true,
      message: "Interview experience submitted successfully and is pending admin approval",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while submitting experience",
      error: error.message,
    });
  }
};

// @desc    Get all approved interview experiences
// @route   GET /api/experiences
// @access  Public
const getAllApprovedExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({ status: "approved" })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching experiences",
      error: error.message,
    });
  }
};

// @desc    Get single approved experience
// @route   GET /api/experiences/:id
// @access  Public
const getExperienceById = async (req, res) => {
  try {
    const experience = await InterviewExperience.findOne({
      _id: req.params.id,
      status: "approved",
    }).populate("user", "name email");

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching experience",
      error: error.message,
    });
  }
};

// @desc    Admin: get all experiences including pending/rejected
// @route   GET /api/experiences/admin/all
// @access  Private/Admin
const getAllExperiencesForAdmin = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin experiences",
      error: error.message,
    });
  }
};

// @desc    Admin: update experience status
// @route   PUT /api/experiences/:id/status
// @access  Private/Admin
const updateExperienceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    experience.status = status;
    await experience.save();

    res.status(200).json({
      success: true,
      message: `Interview experience ${status} successfully`,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating experience status",
      error: error.message,
    });
  }
};

// @desc    Admin: delete experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
const deleteExperience = async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Interview experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting experience",
      error: error.message,
    });
  }
};

module.exports = {
  createExperience,
  getAllApprovedExperiences,
  getExperienceById,
  getAllExperiencesForAdmin,
  updateExperienceStatus,
  deleteExperience,
};