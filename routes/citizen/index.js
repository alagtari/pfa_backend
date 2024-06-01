const express = require("express");
const router = express.Router();

const problemRoutes = require("./problem");
const planRoutes = require("./plan");

router.use("/problem", problemRoutes);
router.use("/plan", planRoutes);

module.exports = router;
