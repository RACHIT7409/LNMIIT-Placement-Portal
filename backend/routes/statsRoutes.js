const express = require("express");
const { getPortalStats } = require("../controllers/statsController");

const router = express.Router();

router.get("/", getPortalStats);

module.exports = router;