const {
  addNewPackage,
  getAllPackages,
  getPackageById,
  updatePackageById,
  deletePackageById,
} = require("../services/pricing.services");
const { findUserByEmail } = require("../services/user.services");

exports.addPackage = async (req, res) => {
  try {
    const data = req.body;
    const { email } = req.user;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ status: false, error: "user not fond" });
    }

    const result = await addNewPackage(data, user);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "package not added" });
    }

    res.status(201).json({ status: true, message: "package added", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "package not added" });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const result = await getAllPackages();

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "package not found" });
    }

    res.status(200).json({ status: true, message: "package finded", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "package not found" });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getPackageById(id);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "package not found" });
    }

    res.status(200).json({ status: true, message: "package finded", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "package not found" });
  }
};

exports.updatePackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updatePackageById(id, data);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "package not updated" });
    }

    res.status(201).json({ status: true, message: "package updated", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "package not updated" });
  }
};

exports.deletePackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePackageById(id);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "package not deleted" });
    }

    res.status(200).json({ status: true, message: "package deleted", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "package not deleted" });
  }
};
