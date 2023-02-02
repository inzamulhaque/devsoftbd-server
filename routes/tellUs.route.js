// post
// get
// get by id
const express = require("express");
const tellUsController = require("../controllers/tellUs.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .get(verifyApiKey, verifyToken, tellUsController.getTellUss)
  .post(verifyApiKey, tellUsController.createTellUs);

router.route("/:id").get(verifyApiKey, verifyToken, tellUsController.getTellUs);

module.exports = router;
