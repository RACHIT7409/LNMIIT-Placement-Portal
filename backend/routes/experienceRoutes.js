const express = require("express");
const {
  createExperience,
  getAllApprovedExperiences,
  getExperienceById,
  getAllExperiencesForAdmin,
  updateExperienceStatus,
  deleteExperience,
} = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getAllApprovedExperiences);
router.get("/admin/all", protect, isAdmin, getAllExperiencesForAdmin);
router.get("/:id", getExperienceById);
router.post("/", protect, createExperience);
router.put("/:id/status", protect, isAdmin, updateExperienceStatus);
router.delete("/:id", protect, isAdmin, deleteExperience);

module.exports = router;