const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

// router.put("/:id", userController.update);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
