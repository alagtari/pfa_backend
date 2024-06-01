const express = require("express");
const router = express.Router();
const controller = require("../../controllers/driver/plan");

router.get("/", controller.getAll);
router.patch("/:id", controller.update);
router.patch('/:id/start', controller.startMission);
router.patch('/:id/end', controller.endMission);
router.patch('/:planId/visit/:locationId', controller.visitLocation);

module.exports = router;
