const mongoose = require("mongoose");
const validator = require("validator");

const subscribeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    status: {
      type: String,
      required: [true, "status address is required"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
