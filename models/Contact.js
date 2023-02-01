// name
// email
// sub
// message
// status(seen, unseen)
const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema(
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
      enum: {
        values: ["seen", "unseen"],
        message: "status value can't be {VALUE}, must be seen/unseen",
      },
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    sub: {
      type: String,
      required: [true, "Please provide your message subject"],
      trim: true,
      minLength: [5, "Subject must be at least 3 characters."],
      maxLength: [100, "Subject is too large"],
    },
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

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
