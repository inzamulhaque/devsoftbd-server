const express = require("express");
// const { createBlog } = require("../controllers/blog.controller");
const verifyApiKey = require("../middleware/apiValidation");
const router = express.Router();
router.route("/", verifyApiKey).post();
module.exports = router;
