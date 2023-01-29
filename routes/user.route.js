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

router.post("/login", userController.login);

router.put("/:id", userController.update);

module.exports = router;
