const express = require("express");
const contactController = require("../controllers/contact.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(verifyApiKey, verifyToken, contactController.getContacts);

router
  .route("/:id")
  .patch(verifyApiKey, verifyToken, contactController.editContact)
  .get(verifyApiKey, verifyToken, contactController.deleteContactById);

module.exports = router;
