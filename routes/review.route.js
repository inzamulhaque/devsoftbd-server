const express = require("express");
const reviewController = require("../controllers/review.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/")
  .post(verifyApiKey, verifyToken, reviewController.createReview)
  .get(verifyApiKey, verifyToken, reviewController.getReviews);

router
  .route("/:id")
  .put(verifyApiKey, verifyToken, reviewController.editReview)
  .delete(verifyApiKey, verifyToken, reviewController.deleteReviewByURL);

module.exports = router;
