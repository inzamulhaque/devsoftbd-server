const express = require("express");
const userController = require("../controllers/user.controller");
const verifyApiKey = require("../middleware/apiValidation");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.post(
  "/signup",
  verifyApiKey,
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  userController.signup
);

router.post("/login", verifyApiKey, userController.login);
router.get("/logout", verifyApiKey, verifyToken, userController.logout);

router.patch("/", verifyApiKey, verifyToken, userController.update);

router.get("/me", verifyApiKey, verifyToken, userController.getMe);

router.get("/totaluser", verifyApiKey, verifyToken, userController.totalUser);

router.patch(
  "/changepassword",
  verifyApiKey,
  verifyToken,
  userController.changePassword
);

router.patch(
  "/resetpassword",
  verifyApiKey,
  verifyToken,
  userController.resetPassword
);

router.patch("/verifyuser/:token", verifyApiKey, userController.verifyUser);

module.exports = router;
