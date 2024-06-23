const express = require("express");
const router = express.Router();

const problemRoutes = require("./problem");
const planRoutes = require("./plan");
const notificationRoutes = require("./notification");

router.use("/problem", problemRoutes);
router.use("/plan", planRoutes);
router.use("/notification", notificationRoutes);

module.exports = router;
