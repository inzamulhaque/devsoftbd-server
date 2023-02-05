const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    position: {
      type: String,
      required: [true, "Please provide a valid position name"],
      trim: true,
      minLength: [3, "Must be at least 3 characters."],
    },

    imgURL: {
      type: String,
      required: [true, "Please provide Image URL"],
      validate: [validator.isURL, "Please provide a valid image url"],
    },

    addedBy: {
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

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
