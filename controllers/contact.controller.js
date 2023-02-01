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

exports.getReview = async (req, res) => {
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
