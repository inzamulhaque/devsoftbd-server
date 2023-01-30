const reviewServices = require("../services/review.services");

exports.createReview = async (req, res) => {
  try {
    const data = req.body;

    const result = await reviewServices.createNewReview(data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Review not created",
      });
    }

    res.status(201).json({ status: true, message: "Review created", blog });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "review not created",
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const result = await reviewServices.getReviews();
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "reviews not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "get reviews successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "reviews not found",
    });
  }
};

exports.editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await reviewServices.editReview(id, data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "review not updated",
      });
    }

    res.status(200).json({
      status: true,
      message: "review updated",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "review not found",
    });
  }
};

exports.deleteReviewByURL = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewServices.deleteReview(id);
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "review not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "review deleted",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "review not found",
    });
  }
};
