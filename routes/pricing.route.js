const express = require("express");
const {
  addPackage,
  getAllPackages,
  getPackageById,
  updatePackageById,
  deletePackageById,
} = require("../controllers/pricing.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyApiKey, verifyToken, addPackage)
  .get(verifyApiKey, getAllPackages);

router
  .route("/:id")
  .get(verifyApiKey, verifyToken, getPackageById)
  .patch(verifyApiKey, verifyToken, updatePackageById)
  .delete(verifyApiKey, verifyToken, deletePackageById);

module.exports = router;
