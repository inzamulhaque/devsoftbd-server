const Pricing = require("../models/Pricing");

exports.addNewPackage = async (data, user) => {
  return await Pricing.create({
    ...data,
    addedBy: { name: user.name, id: user._id },
  });
};

exports.getAllPackages = async () => {
  return await Pricing.find();
};

exports.getPackageById = async (id) => {
  return await Pricing.findById({ _id: id });
};

exports.updatePackageById = async (id, data) => {
  return await Pricing.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { runValidators: true }
  );
};

exports.deletePackageById = async (id) => {
  return await Pricing.findByIdAndDelete({ _id: id });
};

exports.totalPricing = async () => {
  return await Pricing.countDocuments();
};
