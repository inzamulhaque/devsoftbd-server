const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    imgURL: {
      type: String,
      trim: true,
      // unique: true,
      required: [true, "Image URL is required"],
    },

    review: {
      type: String,
      trim: true,
      required: [true, "Review is required"],
    },

    rating: {
      type: Number,
      trim: true,
      //   required: [true, "You must give a rating"],
    },

    createdBy: {
      name: {
        type: String,
        required: [true, "Please provide a employee name"],
      },

      id: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please provide a employee's id"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
// {
//     "name": "Alif",
//     "imgURL":"https://pixlr.com/images/index/remove-bg.webp",
//     "review":"very good",
//     "rating":"5",
//     "createdBy":{
//       "name":"md. ih"
//       "id":"63d4fc8d09e65742d2bc23b7"
//     }

// }
