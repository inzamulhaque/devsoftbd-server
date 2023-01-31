const Subscribe = require("../models/Subscribe");

exports.addEmail = async (email) => {
  return await Subscribe.create({ email });
};

exports.allActiveMail = async () => {
  return await Subscribe.find({ status: "active" }).select("email -_id");
};

exports.removeEmail = async (email) => {
  return await Subscribe.findOneAndDelete({ email });
};
