// name
// name
// password
// contact Number
// emergency Number
// position
// github link
// addedBy
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Confirm Password is required"],
    //   validate: {
    //     validator: (value) =>
    //       validator.isStrongPassword(value, {
    //         minLength: 6,
    //         minLowercase: 1,
    //         minNumbers: 1,
    //         minUppercase: 1,
    //         minSymbols: 1,
    //       }),
    //     message: "Password {VALUE} is not strong enough.",
    //   },
    // },

    role: {
      type: String,
      required: [true, "Please provide a valid position name"],
      enum: {
        values: ["admin"],
        message: "status value can't be {VALUE}, must be admin",
      },
      default: "admin",
    },
    position: {
      type: String,
      required: [true, "Please provide a valid position name"],
      trim: true,
      minLength: [3, "Must be at least 3 characters."],
    },

    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
    emergencyNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
    gitURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid github url"],
    },
    imgURL: {
      type: String,
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
    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.confirmationToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// {
// "email":"mdihalif@gmail.com",
// "password":"123456"
// }
