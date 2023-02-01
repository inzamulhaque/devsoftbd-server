const Contact = require("../models/Contact");

exports.getContacts = async () => {
  return Contact.find().sort({ createdAt: "descending" });
};

exports.editContact = async (id, data) => {
  //   console.log(data, user);
  const result = await Contact.updateOne(
    { _id: id },
    {
      $set: data,
    }
  );
  return result;
};

exports.getContact = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

exports.createContact = async (data) => {
  console.log("result");
  const result = await Contact.create(data);
  return result;
};
