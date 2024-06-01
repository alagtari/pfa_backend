const express = require("express");
const router = express.Router();

const driverRoutes = require("./driver");
const truckRoutes = require("./truck");
const cityRoutes = require("./city");
const planRoutes = require("./plan");
const locationRoutes = require("./location");
const incidentRoutes = require("./incident");

router.use("/city", cityRoutes);
router.use("/driver", driverRoutes);
router.use("/truck", truckRoutes);
router.use("/city", cityRoutes);
router.use("/location", locationRoutes);
router.use("/plan", planRoutes);
router.use("/incident", incidentRoutes);

module.exports = router;
