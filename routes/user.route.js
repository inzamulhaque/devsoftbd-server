const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const apiValidation = require("../middleware/apiValidation");

router.post("/signup", userController.signup);

router.post("/login", apiValidation, userController.login);

router.put("/:id", userController.update);

module.exports = router;
