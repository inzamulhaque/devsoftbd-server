const express = require("express");
const router = express.Router();
router.get("/", async () => {
  console.log("ok");
});
module.exports = router;
