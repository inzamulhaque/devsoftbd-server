const express = require("express");
const {
  createBlog,
  getBlogs,
  editBlog,
  getBlogByURL,
  deleteBlogByURL,
  totalBlogs,
} = require("../controllers/blog.controller");
// const { createBlog } = require("../controllers/blog.controller");
const verifyApiKey = require("../middleware/apiValidation");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/")
  .post(
    verifyApiKey,
    verifyToken,
    (req, res, next) => auth(req, res, next, "admin"),
    createBlog
  )
  .get(verifyApiKey, getBlogs);

router.get("/totalblogs", verifyApiKey, verifyToken, totalBlogs);

router.get("/:url", verifyApiKey, getBlogByURL);

router.patch(
  "/:url",
  verifyApiKey,
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  editBlog
);

router.delete(
  "/:url",
  verifyApiKey,
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  deleteBlogByURL
);
module.exports = router;
