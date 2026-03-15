const Placement = require("../models/Placement");

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseStipendToNumber = (stipend) => {
  if (!stipend) return 0;

  const cleaned = String(stipend).replace(/,/g, "").replace(/[^\d.]/g, "");
  const value = Number(cleaned);

  if (!value || Number.isNaN(value)) return 0;

  return value;
};

const calculateMedian = (arr) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
};

// CREATE
const createPlacement = async (req, res) => {
  try {
    const {
      notificationDate,
      companyName,
      typeOfOffer,
      branchAllowed,
      eligibilityCGPA,
      jobRole,
      ctc,
      stipend,
      placedStudents,
      status,
    } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const placement = await Placement.create({
      notificationDate: notificationDate || "",
      companyName,
      typeOfOffer: typeOfOffer || "",
      branchAllowed: parseArrayField(branchAllowed),
      eligibilityCGPA: Number(eligibilityCGPA) || 0,
      jobRole: jobRole || "",
      ctc: Number(ctc) || 0,
      stipend: stipend || "",
      placedStudents: Number(placedStudents) || 0,
      status: status || "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Placement entry created successfully",
      placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create placement entry",
      error: error.message,
    });
  }
};

// GET ALL
const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch placement entries",
      error: error.message,
    });
  }
};

// GET STATS
const getPlacementStats = async (req, res) => {
  try {
    const placements = await Placement.find();

    const totalCompanies = placements.length;

    const ctcValues = placements
      .map((item) => Number(item.ctc) || 0)
      .filter((value) => value > 0);

    const stipendValues = placements
      .map((item) => parseStipendToNumber(item.stipend))
      .filter((value) => value > 0);

    const totalStudentsPlaced = placements.reduce(
      (sum, item) => sum + (Number(item.placedStudents) || 0),
      0
    );

    const openRoles = placements.filter(
      (item) => item.status === "Open" || item.status === "Ongoing"
    ).length;

    const completedCompanies = placements.filter(
      (item) => item.status === "Completed"
    ).length;

    const pendingCompanies = placements.filter(
      (item) => item.status === "Pending"
    ).length;

    const averageCTC = ctcValues.length
      ? ctcValues.reduce((sum, value) => sum + value, 0) / ctcValues.length
      : 0;

    const medianCTC = calculateMedian(ctcValues);

    const averageStipend = stipendValues.length
      ? stipendValues.reduce((sum, value) => sum + value, 0) / stipendValues.length
      : 0;

    const medianStipend = calculateMedian(stipendValues);

    const TOTAL_STUDENTS = 490;
    const placementRate = TOTAL_STUDENTS
      ? (totalStudentsPlaced / TOTAL_STUDENTS) * 100
      : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalCompanies,
        averageCTC: Number(averageCTC.toFixed(2)),
        medianCTC: Number(medianCTC.toFixed(2)),
        averageStipend: Math.round(averageStipend),
        medianStipend: Math.round(medianStipend),
        totalStudentsPlaced,
        openRoles,
        completedCompanies,
        pendingCompanies,
        totalStudents: TOTAL_STUDENTS,
        placementRate: Number(placementRate.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch placement stats",
      error: error.message,
    });
  }
};

// GET SINGLE
const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement entry not found",
      });
    }

    res.status(200).json({
      success: true,
      placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch placement entry",
      error: error.message,
    });
  }
};

// UPDATE
const updatePlacement = async (req, res) => {
  try {
    const {
      notificationDate,
      companyName,
      typeOfOffer,
      branchAllowed,
      eligibilityCGPA,
      jobRole,
      ctc,
      stipend,
      placedStudents,
      status,
    } = req.body;

    let placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement entry not found",
      });
    }

    placement = await Placement.findByIdAndUpdate(
      req.params.id,
      {
        notificationDate: notificationDate ?? placement.notificationDate,
        companyName: companyName ?? placement.companyName,
        typeOfOffer: typeOfOffer ?? placement.typeOfOffer,
        branchAllowed:
          branchAllowed !== undefined
            ? parseArrayField(branchAllowed)
            : placement.branchAllowed,
        eligibilityCGPA:
          eligibilityCGPA !== undefined && eligibilityCGPA !== ""
            ? Number(eligibilityCGPA)
            : placement.eligibilityCGPA,
        jobRole: jobRole ?? placement.jobRole,
        ctc:
          ctc !== undefined && ctc !== ""
            ? Number(ctc)
            : placement.ctc,
        stipend: stipend ?? placement.stipend,
        placedStudents:
          placedStudents !== undefined && placedStudents !== ""
            ? Number(placedStudents)
            : placement.placedStudents,
        status: status ?? placement.status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Placement entry updated successfully",
      placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update placement entry",
      error: error.message,
    });
  }
};

// DELETE
const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement entry not found",
      });
    }

    await placement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Placement entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete placement entry",
      error: error.message,
    });
  }
};

module.exports = {
  createPlacement,
  getAllPlacements,
  getPlacementStats,
  getPlacementById,
  updatePlacement,
  deletePlacement,
};