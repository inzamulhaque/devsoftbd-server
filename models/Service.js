// 1. Email Adress*
// 2. service name*
// 5. req*
// 6. Status*
const mongoose = require("mongoose");
const validator = require("validator");

const serviceSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
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
    serviceName: {
      type: String,
      required: [true, "Please provide service name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    req: {
      type: String,
      required: [true, "Please provide your requirements"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
// {
//     "serviceName": "Alif inzamul",
//     "email":"a@a.com",
//     "req":"fgf fhd fdhd hdth th tht th",
//     "status":"unseen"
// }
