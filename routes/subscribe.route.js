const express = require("express");
const {
  addEmail,
  sendNewsLetter,
  deleteEmail,
} = require("../controllers/subscribe.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.route("/").post(verifyApiKey, addEmail);
router.route("/newsletter").post(verifyApiKey, verifyToken, sendNewsLetter);
router.delete("/:email", verifyApiKey, deleteEmail);
module.exports = router;
