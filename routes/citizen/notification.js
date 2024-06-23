const express = require("express");
const router = express.Router();
const controller = require("../../controllers/citizen/notification");

router.get("/", controller.getAll);

module.exports = router;
