const nodemailer = require("nodemailer");

const {
  createOrder,
  getAllOrders,
  countOrder,
  getOrderById,
} = require("../services/pricingOrder.services");

exports.createOrder = async (req, res) => {
  try {
    const data = req.body;
    const result = await createOrder(data);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, error: "order not created" });
    }

    let transporter = nodemailer.createTransport({
      host: "mail.devsoftbd.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: data.email, // list of receivers
      subject: "thank you", // Subject line
      html: `<h1>thank you for ordering ${data.package.name}</h1>`, // html body
    });

    res.status(201).json({ status: true, message: "order created", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "order not created" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await getAllOrders();

    if (!result) {
      return res.status(400).json({ status: false, error: "order not found" });
    }

    res.status(200).json({ status: true, message: "order found", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "order not found" });
  }
};

exports.countOrder = async (req, res) => {
  try {
    const result = await countOrder();

    if (!result) {
      return res.status(200).json({ status: true, result: 0 });
    }

    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(400).json({ status: false, error: "order not found" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getOrderById(id);

    if (!result) {
      return res.status(200).json({ status: false, error: "order not found" });
    }

    res.status(200).json({ status: true, messafe: "order found", result });
  } catch (error) {
    res.status(400).json({ status: false, error: "order not found" });
  }
};
