const Service = require("../models/Service");

exports.getServices = async () => {
  return Service.find().sort({ createdAt: "descending" });
};

exports.getService = async (id) => {
  await Service.findByIdAndUpdate(id, { status: "seen" });
  const result = await Service.findById(id);
  return result;
};

exports.createService = async (data) => {
  console.log("result");
  const result = await Service.create(data);
  return result;
};

exports.totalUnseenService = async () => {
  return await Service.countDocuments({ status: "unseen" });
};
