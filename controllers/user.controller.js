const nodemailer = require("nodemailer");
const userService = require("../services/user.services");

const generateToken = require("../utils/token");
const { statusError } = require("../utils/statusError");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { email } = req.user || {};
    const addedBy = await userService.findUserByEmail(email);
    const verifyToken = Math.floor(100000 + Math.random() * 900000);
    const time = new Date();
    time.setMinutes(time.getMinutes() + 10);

    if (!addedBy) {
      return res.status(400).json({ status: false, error: "user not found" });
    }

    const user = await userService.signup(req.body, addedBy, verifyToken, time);
    // await user.save({ validateBeforeSave: true });
    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "user not created" });
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
      to: req.body.email, // list of receivers
      bcc: "",
      subject: "active your account", // Subject line
      html: `please verify our account. <a href="https://admin.devsoftbd.com/activeadminaccount/${verifyToken}">Click</a> <br/><br/> <h3>Best Regards,<br/>${addedBy.name}<br/>DevSoftBD</h3>`, // html body
    });

    res
      .status(200)
      .send({ status: true, message: "Successfully signed up", user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "user not create", status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw statusError("Provide your credentials", 404);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw statusError("No users found!", 404);
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) throw statusError("Passwoed not match!", 404);
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    if (!others) throw statusError("failed", 404);

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      user: others,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { email } = req.user;
    if (!email) throw statusError("No users found!", 404);
    const user = await userService.findUserByEmail(email);
    if (!user) throw statusError("No users found!", 404);
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, user);
    if (!updatedUser) throw statusError("No users found!", 404);
    res.status(200).send({
      status: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong",
      error,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await userService.findUserByEmail(email);
    const { password, ...others } = user.toObject();
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    res.status(200).json({
      status: true,
      user: others,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(400).send({
        status: false,
        error: "User not find",
      });
    }

    const isPasswordValid = user.comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        status: false,
        error: "Invalid password",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({
        status: false,
        error: "Password and Confirm Password do not match",
      });
    }

    const result = await userService.updatePassword(user, newPassword);

    if (!result) {
      return res.status(400).send({
        status: false,
        error: "Password and Confirm Password do not match",
      });
    }

    res.status(200).send({
      status: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "User not find",
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await userService.getUserByToken(token);

    if (!user) {
      return res.status(400).send({
        status: false,
        error: "User not find",
      });
    }

    if (new Date() > new Date(user.confirmationTokenExpires)) {
      return res.status(400).send({
        status: false,
        error: "Time Out",
      });
    }

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z!@#$%^&*]).{6,}$/.test(
        req.body.password
      )
    ) {
      return res.status(400).json({
        status: false,
        error: "please provide a strong password",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: false,
        error: "password and confirmpassword do not match",
      });
    }

    const result = await userService.updatedPassword(
      user._id,
      req.body.password
    );

    if (!result) {
      return res.status(400).send({
        status: false,
        error: "User not verifed",
      });
    }

    res.status(200).json({ status: true, message: "user verifed" });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "User not find",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const actionEmail = req.user.email;
    const actionUser = await userService.findUserByEmail(actionEmail);

    if (!actionUser) {
      return res.status(400).send({
        status: false,
        error: "User not find",
      });
    }

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(400).send({
        status: false,
        error: "User not find",
      });
    }

    const verifyToken = Math.floor(100000 + Math.random() * 900000);
    const time = new Date();
    time.setMinutes(time.getMinutes() + 10);

    const result = await userService.resetPassword(user._id, verifyToken, time);

    if (!result) {
      return res.status(400).send({
        status: false,
        error: "password not reseted",
      });
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
      to: req.body.email, // list of receivers
      bcc: "",
      subject: "reset your password", // Subject line
      html: `please reset your password. <a href="https://admin.devsoftbd.com/activeadminaccount/${verifyToken}">Click</a> <br/><br/> <h3>Best Regards,<br/>${actionUser.name}<br/>DevSoftBD</h3>`, // html body
    });

    res.status(200).json({ status: true, message: "password reseted" });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "User not find",
    });
  }
};

exports.totalUser = async (req, res) => {
  try {
    const result = await userService.totalUser();

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
      error: "User not find",
    });
  }
};
