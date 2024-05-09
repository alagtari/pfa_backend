const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const { loggedMiddleware } = require("../middlewares/auth");
const fileMiddleware = require("../middlewares/uploads");

router.post("/login", controller.login);
router.post("/signup/citizen", fileMiddleware, controller.signupCitizen);
router.post("/signup/driver", fileMiddleware, controller.signupDriver);
router.get("/me", loggedMiddleware, controller.me);
router.patch("/forgotpassword", controller.forgotPassword);
router.patch("/verifycode", controller.verifyCode);
router.patch("/resendcode", controller.resendCode);
router.patch("/newpassword", controller.newPassword);
router.patch("/resetpassword", loggedMiddleware, controller.resetPassword);
router.patch("/updateprofile", loggedMiddleware, fileMiddleware, controller.updateProfile);

module.exports = router;
