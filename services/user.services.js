// create
//login
//update
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (userInfo, addedBy) => {
  if (userInfo.password !== userInfo.confirmPassword) {
    return "confirmPassword: Passwords don't match!";
  }
  const password = userInfo.password;
  const hashedPassword = bcrypt.hashSync(password);
  userInfo.password = hashedPassword;
  const user = await User.create({
    ...userInfo,
    addedBy: { name: addedBy.name, id: addedBy._id },
  });
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
