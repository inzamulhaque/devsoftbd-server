const Contact = require("../models/Contact");

exports.getContacts = async () => {
  return Contact.find().sort({ createdAt: "descending" });
};

// exports.editContact = async (id, data) => {
//   //   console.log(data, user);
//   const result = await Contact.updateOne(
//     { _id: id },
//     {
//       $set: {"status":},
//     }
//   );
//   return result;
// };

exports.getContact = async (id) => {
  await Contact.findByIdAndUpdate(id, { status: "seen" });
  const result = await Contact.findById(id);
  return result;
};

exports.createContact = async (data) => {
  console.log("result");
  const result = await Contact.create(data);
  return result;
};

exports.totalUnseenContact = async () => {
  return await Contact.countDocuments({ status: "unseen" });
};
