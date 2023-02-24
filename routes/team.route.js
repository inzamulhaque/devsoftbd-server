const express = require("express");
const {
  addTeamMember,
  getAllMember,
  totalMember,
  getmemberById,
  updateMemberById,
  deleteMemberById,
} = require("../controllers/team.controller");
const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyApiKey, verifyToken, addTeamMember)
  .get(verifyApiKey, getAllMember);

router.get("/totalmember", verifyApiKey, totalMember);

router
  .route("/:id")
  .get(verifyApiKey, verifyToken, getmemberById)
  .patch(verifyApiKey, verifyToken, updateMemberById)
  .delete(verifyApiKey, verifyToken, deleteMemberById);

module.exports = router;
