const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/problem");

router.get("/", controller.getAll);


module.exports = router;
