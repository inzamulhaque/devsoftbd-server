const blogSchema = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { error, value } = await blogSchema(req.body);

    console.log(error, value);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not created",
    });
  }
};
