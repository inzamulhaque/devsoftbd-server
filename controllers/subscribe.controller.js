const nodemailer = require("nodemailer");
const {
  addEmail,
  allActiveMail,
  removeEmail,
} = require("../services/subscribe.services");
const { findUserByEmail } = require("../services/user.services");

exports.addEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const subcribe = await addEmail(email);

    if (!subcribe) {
      return res.status(400).send({
        status: false,
        error: "email not added",
      });
    }

    res.status(200).send({
      status: true,
      message: "email added",
      subcribe,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "email not added",
    });
  }
};

exports.sendNewsLetter = async (req, res) => {
  try {
    const emails = await allActiveMail();
    const email = emails.map((email) => email.email);
    const { subject, message } = req.body;

    if (!email) {
      return res.status(400).send({
        status: false,
        error: "email not found",
      });
    }

    if (!subject || !message) {
      return res.status(400).send({
        status: false,
        error: "please provided correct data",
      });
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
      to: "", // list of receivers
      bcc: email,
      subject: subject, // Subject line
      html: `${message} <br/><br/> <h3>Best Regards,<br/>DevSoftBD<br/>info@devsoftbd.com</h3>`, // html body
    });

    if (!info.messageId) {
      return res.status(400).send({
        status: false,
        error: "email not send",
      });
    }

    res.status(200).send({
      status: true,
      message: "email sended",
      info,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "email not found",
    });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).send({
        status: false,
        error: "email not found",
      });
    }

    const result = await removeEmail(email);

    if (!result) {
      return res.status(400).send({
        status: false,
        error: "email not found",
      });
    }

    res.status(400).send({
      status: true,
      message: "Unsubcribe",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "email not found",
    });
  }
};
