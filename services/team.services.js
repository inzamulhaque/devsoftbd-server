const Team = require("../models/Team");

exports.addMember = async (member, addedBy) => {
  return await Team.create({
    ...member,
    addedBy: { name: addedBy.name, id: addedBy._id },
  });
};

exports.allMember = async () => {
  return await Team.find();
};

exports.totalMember = async () => {
  return await Team.countDocuments();
};

exports.getMemberById = async (id) => {
  return await Team.findById({ _id: id });
};

exports.updateMemberById = async (id, data) => {
  return await Team.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { runValidators: true }
  );
};

exports.deleteMemberById = async (id) => {
  return await Team.findByIdAndDelete({ _id: id });
};
