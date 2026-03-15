const express = require("express");
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.post("/", protect, isAdmin, createResource);
router.put("/:id", protect, isAdmin, updateResource);
router.delete("/:id", protect, isAdmin, deleteResource);

module.exports = router;