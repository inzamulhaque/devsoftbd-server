// post
// get
// get by id
const express = require("express");
const serviceController = require("../controllers/service.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .get(verifyApiKey, verifyToken, serviceController.getServices)
  .post(verifyApiKey, serviceController.createService);

router
  .route("/totalUnseenService")
  .get(verifyApiKey, verifyToken, serviceController.totalUnseenService);

router
  .route("/:id")
  .get(verifyApiKey, verifyToken, serviceController.getService);

module.exports = router;
