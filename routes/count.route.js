const express = require("express");
const { allCount } = require("../controllers/count.controller");

const verifyApiKey = require("../middleware/apiValidation");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyApiKey, verifyToken, allCount);
module.exports = router;
