// create
//login
//update
const userService = require("../services/user.services");

const generateToken = require("../utils/token");
const { statusError } = require("../utils/statusError");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { email } = req.user;
    const addedBy = await userService.findUserByEmail(email);

    if (!addedBy) {
      return res.status(400).json({ status: false, error: "user not found" });
    }

    const user = await userService.signup(req.body, addedBy);
    // await user.save({ validateBeforeSave: true });
    if (!user) {
      return res.status(400).send({ message: "user not create" });
    }
    res.status(200).send({ message: "Successfully signed up" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "user not create" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw statusError("Provide your credentials", 404);
    const user = await userService.findUserByEmail(email);
    if (!user) throw statusError("No users found!", 404);
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) throw statusError("Passwoed not match!", 404);
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    if (!others) throw statusError("failed", 404);
    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "User not found",
    });
  }
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
