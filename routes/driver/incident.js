const express = require("express");
const router = express.Router();
const controller = require("../../controllers/driver/incident");
const fileMiddleware = require("../../middlewares/uploads");

router.post("/", fileMiddleware, controller.create);

module.exports = router;
