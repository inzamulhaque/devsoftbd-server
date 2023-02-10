const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const pricingOrderSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      trim: true,
      required: [true, "client name is required"],
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "client email address is required"],
    },

    note: String,

    package: {
      name: {
        type: String,
        required: [true, "package name is required"],
      },

      price: {
        type: String,
        required: [true, "package price is required"],
      },

      services: {
        type: Object,
      },

      id: {
        type: ObjectId,
        ref: "Pricing",
        required: [true, "Please provide a package id"],
      },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["seen", "unseen"],
        message: "status value can't be {VALUE}, must be seen/unseen",
      },
      default: "unseen",
    },
  },
  {
    timestamps: true,
  }
);

const PricingOrder = mongoose.model("PricingOrder", pricingOrderSchema);

module.exports = PricingOrder;
