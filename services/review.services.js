const Review = require("../models/Review");

exports.createNewReview = async (data, user) => {
  const result = await Review.create({
    ...data,
    "createdBy.id": user._id,
    "createdBy.name": user.name,
  });
  console.log(result);
  return result;
};

exports.getReviews = async () => {
  return Review.find().sort({ createdAt: "descending" });
};

exports.editReview = async (id, data, user) => {
  console.log(data, user);
  const result = await Review.findByIdAndUpdate({ _id: id }, data);
  return result;
};

exports.deleteReview = async (id) => {
  return await Review.findOneAndDelete({ _id: id }, { new: true });
};

exports.totalReview = async () => {
  return await Review.countDocuments();
};
