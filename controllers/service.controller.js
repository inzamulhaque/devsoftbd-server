const serviceServices = require("../services/service.services");

exports.getServices = async (req, res) => {
  try {
    const result = await serviceServices.getServices();
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Service not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "get Service successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Service not found",
      error,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const result = await serviceServices.getService(req.params.id);
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Service not found",
      });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong",
      error,
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await serviceServices.createService(data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Service not created",
      });
    }

    res.status(201).json({ status: true, message: "Service created", result });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Service not created",
      error,
    });
  }
};

exports.totalUnseenService = async (req, res) => {
  try {
    const result = await serviceServices.totalUnseenService();
    console.log(result);
    if (!result) {
      return res.status(200).send({
        status: true,
        count: 0,
      });
    }

    res.status(200).send({
      status: true,
      count: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "Service not found",
    });
  }
};
