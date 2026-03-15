const express = require("express");
const {
  createPlacement,
  getAllPlacements,
  getPlacementStats,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} = require("../controllers/placementController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", getPlacementStats);

router.route("/").get(getAllPlacements).post(protect, adminOnly, createPlacement);

router
  .route("/:id")
  .get(getPlacementById)
  .put(protect, adminOnly, updatePlacement)
  .delete(protect, adminOnly, deletePlacement);

module.exports = router;