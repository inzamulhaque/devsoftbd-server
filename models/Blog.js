const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Blog title is required"],
    },

    url: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Blog url is required"],
    },

    metaTitle: {
      type: String,
      trim: true,
      required: [true, "Meta title is required"],
    },

    metaDescription: {
      type: String,
      trim: true,
      required: [true, "Meta description is required"],
    },

    metaKeywords: {
      type: String,
      trim: true,
      required: [true, "Meta keywords is required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },

    img1: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
      required: [true, "Description is required"],
    },

    img2: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
      required: [true, "Description is required"],
    },

    author: {
      name: {
        type: String,
        required: [true, "Please provide a employee name"],
      },

      email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
      },

      id: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please provide a employee's id"],
      },
    },

    editBy: [
      {
        name: String,
        id: {
          type: ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
// {
//   "title": "test test test test test",
//   "metaTitle": "test",
//   "metaDescription": "test",
//   "description": "test",
//   "img1": "https://devsoftbd.com",
//   "img2": "https://devsoftbd.com"
// }
