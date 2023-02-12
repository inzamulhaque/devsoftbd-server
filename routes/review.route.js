const express = require("express");
const reviewController = require("../controllers/review.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/")
  .post(verifyApiKey, verifyToken, reviewController.createReview)
  .get(verifyApiKey, reviewController.getReviews);

router.get(
  "/totalreview",
  verifyApiKey,
  verifyToken,
  reviewController.totalReview
);

router
  .route("/:id")
  .patch(verifyApiKey, verifyToken, reviewController.editReview)
  .delete(verifyApiKey, verifyToken, reviewController.deleteReviewById);

module.exports = router;
