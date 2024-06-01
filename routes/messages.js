const express = require("express");
const router = express.Router();
const controller = require("../controllers/message");
const { loggedMiddleware } = require("../middlewares/auth");

router.use(loggedMiddleware);
router.get("/", controller.getRooms);
router.get("/driver", controller.getDriverMessages);
router.get("/:room", controller.getMessagesByRoomId);
router.post("/", controller.create);
router.post("/driver", controller.sendDriverMessage);

module.exports = router;
