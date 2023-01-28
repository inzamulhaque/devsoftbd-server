// create
//login
//update
const userService = require("../services/user.services");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const { statusError } = require("../utils/statusError");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    console.log("object");
    const user = await userService.signup(req.body);
    // await user.save({ validateBeforeSave: true });
    console.log(user);
    if (!user) throw statusError("No users found!", 404);
    console.log("object");
    res.status(200).send({ message: "Successfully signed up" });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw statusError("Provide your credentials", 401);
  const user = await User.findOne({ email });
  if (!user) throw statusError("No users found!", 401);
  const isPasswordValid = user.comparePassword(password, user.password);
  if (!isPasswordValid) throw statusError("Password is not correct", 403);
  const token = generateToken(user);
  const { password: pwd, ...others } = user.toObject();
  if (!others) throw statusError("failed", 500);
  res.status(200).json({
    status: "success",
    message: "Successfully logged in",
    data: {
      user: others,
      token,
    },
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (!id) throw statusError("No users found!", 404);
  const user = await User.findUserByEmail({ id });
  if (!user) throw statusError("No users found!", 404);
  const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
    new: false,
  });
  if (!updatedUser) throw statusError("No users found!", 404);
  res.status(200).send({
    message: "User updated successfully",
  });
};

exports.getMe = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await userService.findUserByEmail({ email });
    console.log(user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
