const express = require("express");
const contactController = require("../controllers/contact.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .get(verifyApiKey, verifyToken, contactController.getContacts)
  .post(verifyApiKey, contactController.createContact);

router.get("/totalunseencontact", verifyApiKey, verifyToken);

router
  .route("/:id")
  .patch(verifyApiKey, verifyToken, contactController.editContact)
  .get(verifyApiKey, verifyToken, contactController.getContact);

module.exports = router;
