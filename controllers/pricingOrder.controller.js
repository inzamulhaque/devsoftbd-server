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
        pass: process.env.email_pass, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: data.email, // list of receivers
      subject: "🙏 Thank you for your order!", // Subject line
      html: `<div
        style="padding: 100px;
          margin: 350px;
          color: #2C3333;
          backgroundColor: #E7F6F2;
          fontFamily:  Arial, sans-serif,
          fontSize:  16px;
          borderRadius: 24px;"
      >
        <p>
          Dear <b>recipientName</b> ,
        </p>
        <p>
          Thank you for your recent order from our store. We appreciate your
          business and are happy to have you as a customer.
        </p>
        <p style="margin: 20px 0; font-size: 18px;">Order Details</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                Item
              </th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                Quantity
              </th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Product 1</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$19.99</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Product 2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$29.99</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Product 3</td>
              <td style="border: 1px solid #ddd; padding: 8px;">3</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$39.99</td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 20px 0;">
          Your order total is <b>orderTotal</b>. We will send you a separate
          email with shipping details once your order has shipped.
        </p>
        <p>Thank you for your purchase!</p>
        <p>Sincerely,</p>
        <p>DevSoftBD Team</p>
        <p>For farther information, Please Contact : devsoftbd1.com</p>
      </div>`, // html body
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
