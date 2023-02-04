const tellUsServices = require("../services/tellUs.services");

exports.getTellUss = async (req, res) => {
  try {
    const result = await tellUsServices.getTellUss();
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "TellUs not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "get TellUs successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "TellUs not found",
      error,
    });
  }
};

// exports.editTellUs = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const result = await tellUsServices.editTellUs(id, data);

//     if (!result) {
//       return res.status(400).json({
//         status: false,
//         error: "TellUs not updated",
//       });
//     }

//     res.status(200).json({
//       status: true,
//       message: "TellUs updated",
//       result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       message: "TellUs not found",
//       error,
//     });
//   }
// };

exports.getTellUs = async (req, res) => {
  try {
    const result = await tellUsServices.getTellUs(req.params.id);
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "TellUs not found",
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

exports.createTellUs = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await tellUsServices.createTellUs(data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "TellUs not created",
      });
    }

    res.status(201).json({ status: true, message: "TellUs created", result });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "TellUs not created",
      error,
    });
  }
};

exports.totalTell = async (req, res) => {
  try {
    const result = await tellUsServices.totalUser();

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
      error: "Tell US not find",
    });
  }
};
