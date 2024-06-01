const express = require("express");
const router = express.Router();

const planRoutes = require("./plan");

router.use("/plan", planRoutes);
module.exports = router;
