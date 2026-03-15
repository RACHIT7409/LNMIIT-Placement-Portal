const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", protect, isAdmin, createCompany);
router.put("/:id", protect, isAdmin, updateCompany);
router.delete("/:id", protect, isAdmin, deleteCompany);

module.exports = router;