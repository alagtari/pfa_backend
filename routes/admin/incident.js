const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/incident");

router.get("/", controller.getAll);

module.exports = router;
