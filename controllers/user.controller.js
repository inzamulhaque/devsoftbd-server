// create
//login
//update
const userService = require("../services/user.services");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const { statusError } = require("../utils/statusError");

exports.signup = async (req, res) => {
  const user = await userService.signup(req.body);
  await user.save({ validateBeforeSave: true });
  if (!user) throw statusError("No users found!", 404);
  res.status(200).send({ message: "Successfully signed up" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw statusError("Provide your credentials", 404);
  const user = await findUserByEmail(email);
  if (!user) throw statusError("No users found!", 404);
  const isPasswordValid = user.comparePassword(password, user.password);
  if (!isPasswordValid) throw statusError("No password found!", 404);
  const token = generateToken(user);
  const { password: pwd, ...others } = user.toObject();
  if (!others) throw statusError("failed", 404);
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
  const user = await findUserByEmail(email);
  if (!user) throw statusError("No users found!", 404);
  const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, user, {
    new: false,
  });
  if (!updatedUser) throw statusError("No users found!", 404);
  res.status(200).send({
    message: "User updated successfully",
  });
};
