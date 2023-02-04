const TellUs = require("../models/TellUs");

exports.getTellUss = async () => {
  return TellUs.find().sort({ createdAt: "descending" });
};

// exports.editTellUs = async (id, data) => {
//   //   console.log(data, user);
//   const result = await TellUs.updateOne(
//     { _id: id },
//     {
//       $set: {"status":},
//     }
//   );
//   return result;
// };

exports.getTellUs = async (id) => {
  await TellUs.findByIdAndUpdate(id, { status: "seen" });
  const result = await TellUs.findById(id);
  return result;
};

exports.createTellUs = async (data) => {
  console.log("result");
  const result = await TellUs.create(data);
  return result;
};

exports.totalUser = async () => {
  return await TellUs.countDocuments({ status: "unseen" });
};
