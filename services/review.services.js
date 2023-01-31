const Review = require("../models/Review");

exports.createNewReview = async (data, user) => {
  const result = await Review.create({
    ...data,
    "createdBy.id": user._id,
    "createdBy.name": user.name,
  });
  console.log(user._id);
  return result;
};

exports.getReviews = async () => {
  return Review.find().sort({ createdAt: "descending" });
};

exports.editReview = async (id, data, user) => {
  return Review.updateOne(
    { _id: id },
    {
      ...data,
      $push: { createdBy: { name: user.name, id: user._id } },
    }
  );
};

exports.deleteReview = async (id) => {
  return await Review.findOneAndDelete({ _id: id }, { new: true });
};
