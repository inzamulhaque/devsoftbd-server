// 1. Email Adress*
// 2. company name*
// 3. Industry Name*
// 4. Website URL
// 5. Message*
// 6. Status*
const mongoose = require("mongoose");
const validator = require("validator");

const tellUsSchema = mongoose.Schema(
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
      required: true,
      default: "unseen",
      enum: {
        values: ["seen", "unseen"],
        message: "status value can't be {VALUE}, must be seen/unseen",
      },
    },
    companyName: {
      type: String,
      // required: [true, "Please provide your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    industryName: {
      type: String,
      // required: [true, "Please provide your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    webURL: {
      type: String,
      trim: true,
      // unique: true,
      // required: [true, "Image URL is required"],
    },
    // sub: {
    //   type: String,
    //   required: [true, "Please provide your message subject"],
    //   trim: true,
    //   minLength: [5, "Subject must be at least 3 characters."],
    //   maxLength: [100, "Subject is too large"],
    // },
    message: {
      type: String,
      required: [true, "Please provide your message"],
      trim: true,
      minLength: [10, "message must be at least 3 characters."],
    },
  },
  {
    timestamps: true,
  }
);

const TellUs = mongoose.model("TellUs", tellUsSchema);

module.exports = TellUs;
// {
//     "companyName": "Alif inzamul",
//     "industryName": "Alif inzamul",
//     "email":"a@a.com",
//     "message":"fgf fhd fdhd hdth th tht th",
//     "status":"unseen"
// }
