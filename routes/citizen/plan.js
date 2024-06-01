const express = require("express");
const router = express.Router();
const controller = require("../../controllers/citizen/plan");

router.get("/", controller.getAll);

module.exports = router;
