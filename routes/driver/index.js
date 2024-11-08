const express = require("express");
const router = express.Router();

const planRoutes = require("./plan");
const incidentRoutes = require("./incident");

router.use("/plan", planRoutes);
router.use("/incident", incidentRoutes);

module.exports = router;
