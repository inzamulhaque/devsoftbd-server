const PricingOrder = require("../models/PricingOrders");

exports.createOrder = async (data) => {
  return await PricingOrder.create(data);
};

exports.getAllOrders = async () => {
  return await PricingOrder.find().sort({ createdAt: "descending" });
};

exports.countOrder = async () => {
  return await PricingOrder.countDocuments({ status: "unseen" });
};

exports.getOrderById = async (id) => {
  return await PricingOrder.findByIdAndUpdate(
    id,
    { status: "seen" },
    {
      runValidators: true,
    }
  );
};
