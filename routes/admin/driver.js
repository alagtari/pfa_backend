const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/driver");
const { loggedMiddleware } = require("../../middlewares/auth");

router.get("/", controller.getAll);
router.get("/available", controller.getAvailable);
router.get("/:id", controller.getById);
router.post("/", loggedMiddleware, controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
