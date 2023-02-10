const express = require("express");
const {
  createOrder,
  getAllOrders,
  countOrder,
  getOrderById,
} = require("../controllers/pricingOrder.controller");

const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyApiKey, createOrder)
  .get(verifyApiKey, verifyToken, getAllOrders);

router.get("/count", verifyApiKey, verifyToken, countOrder);

router.get("/:id", verifyApiKey, verifyToken, getOrderById);
module.exports = router;
