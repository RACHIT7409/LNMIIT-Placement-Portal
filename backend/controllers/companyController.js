const Company = require("../models/Company");

// @desc    Create company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = async (req, res) => {
  try {
    const { name, logo, questions } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const existingCompany = await Company.findOne({ name });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      name,
      logo: logo || "",
      questions: Array.isArray(questions) ? questions : [],
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating company",
      error: error.message,
    });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching companies",
      error: error.message,
    });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching company",
      error: error.message,
    });
  }
};

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = async (req, res) => {
  try {
    const { name, logo, questions } = req.body;

    let company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: name || company.name,
        logo: logo ?? company.logo,
        questions: Array.isArray(questions) ? questions : company.questions,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating company",
      error: error.message,
    });
  }
};

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting company",
      error: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};