const contactServices = require("../services/contact.services");

exports.getContacts = async (req, res) => {
  try {
    const result = await contactServices.getContacts();
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Contacts not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "get Contacts successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Contacts not found",
      error,
    });
  }
};

exports.editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await contactServices.editContact(id, data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Contact not updated",
      });
    }

    res.status(200).json({
      status: true,
      message: "Contact updated",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Contact not found",
      error,
    });
  }
};

exports.getContact = async (req, res) => {
  try {
    const result = await contactServices.getContact(req.params.id);
    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Contact not found",
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

exports.createContact = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await contactServices.createContact(data);

    if (!result) {
      return res.status(400).json({
        status: false,
        error: "Contact not created",
      });
    }

    res.status(201).json({ status: true, message: "Contact created", result });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "contact not created",
      error,
    });
  }
};

exports.totalUnSennContact = async (req, res) => {
  try {
    const result = await contactServices.totalUnseenContact();

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
      error: "Contact not find",
    });
  }
};
