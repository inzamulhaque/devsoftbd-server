const Review = require("../models/Review");

exports.createNewReview = async (data) => {
  return await Review.create({ data });
};

exports.getReviews = async () => {
  return Review.find().sort({ createdAt: "descending" });
};

exports.editReview = async (id, data, user) => {
  return Review.updateOne({ id: id }, { $set: data });
};

exports.deleteReview = async (id) => {
  return await Review.findOneAndDelete({ _id: id }, { new: true });
};
