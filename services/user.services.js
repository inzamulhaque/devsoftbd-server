// create
//login
//update
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (userInfo, addedBy, verifyToken, time) => {
  // const password = userInfo.password;
  // const hashedPassword = bcrypt.hashSync(password);
  // userInfo.password = hashedPassword;
  const user = await User.create({
    ...userInfo,
    confirmationToken: verifyToken,
    confirmationTokenExpires: time,
    addedBy: { name: addedBy.name, id: addedBy._id },
  });
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.updatePassword = async (user, password) => {
  const hashedPassword = bcrypt.hashSync(password);
  return User.findByIdAndUpdate(
    user._id,
    { password: hashedPassword },
    { runValidators: true }
  );
};

exports.getUserByToken = async (token) => {
  return User.findOne({ confirmationToken: token });
};

exports.updatedPassword = async (id, password) => {
  const hashedPassword = bcrypt.hashSync(password);
  return User.findByIdAndUpdate(
    { _id: id },
    {
      password: hashedPassword,
      status: "active",
      confirmationToken: undefined,
    },
    { runValidators: true }
  );
};

exports.resetPassword = async (id, verifyToken, time) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { confirmationToken: verifyToken, confirmationTokenExpires: time },
    { runValidators: true }
  );
};

exports.totalUser = async () => {
  return await User.countDocuments();
};
