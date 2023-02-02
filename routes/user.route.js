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

router.patch("/", verifyApiKey, verifyToken, userController.update);

router.get("/me", verifyToken, userController.getMe);

router.patch(
  "/changepassword",
  verifyApiKey,
  verifyToken,
  userController.changePassword
);

module.exports = router;
