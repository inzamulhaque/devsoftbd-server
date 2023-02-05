const {
  addMember,
  allMember,
  totalMember,
  getMemberById,
  updateMemberById,
  deleteMemberById,
} = require("../services/team.services");
const { findUserByEmail } = require("../services/user.services");

exports.addTeamMember = async (req, res) => {
  try {
    const { email } = req.user;
    const addedUser = await findUserByEmail(email);

    if (!addedUser) {
      return res.status(400).send({
        status: false,
        error: "team member not added",
      });
    }

    const teamMember = await addMember(req.body, addedUser);

    if (!teamMember) {
      return res.status(400).send({
        status: false,
        error: "team member not added",
      });
    }

    res.status(201).send({
      status: true,
      message: "team member added",
      teamMember,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not added",
    });
  }
};

exports.getAllMember = async (req, res) => {
  try {
    const result = await allMember();

    if (!result) {
      return res.status(400).send({
        status: false,
        error: "team member not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "team member found",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not found",
    });
  }
};

exports.totalMember = async (req, res) => {
  try {
    const member = await totalMember();

    if (!member) {
      return res.status(200).send({
        status: true,
        member: 0,
      });
    }

    res.status(200).send({
      status: true,
      member,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not found",
    });
  }
};

exports.getmemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await getMemberById(id);

    if (!member) {
      return res.status(400).send({
        status: false,
        error: "team member not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "team member found",
      member,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not found",
    });
  }
};

exports.updateMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await updateMemberById(id, req.body);

    if (!member) {
      return res.status(400).send({
        status: false,
        error: "team member not updated",
      });
    }

    res.status(200).send({
      status: true,
      message: "team member updated",
      member,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not updated",
    });
  }
};

exports.deleteMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await deleteMemberById(id);

    if (!member) {
      return res.status(400).send({
        status: false,
        error: "team member not deleted",
      });
    }

    res.status(200).send({
      status: true,
      message: "team member deleted",
      member,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "team member not deleted",
    });
  }
};
