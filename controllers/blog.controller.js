const {
  createNewBlog,
  getBlogs,
  getBlogByURL,
  editBlog,
  saveDeleteBlog,
  deleteBlog,
  totalBlogs,
} = require("../services/blog.services");
const { findUserByEmail } = require("../services/user.services");
const blogURL = require("../utils/blogURL");

exports.createBlog = async (req, res) => {
  try {
    const data = req.body;
    const { email } = req.user;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        status: false,
        error: "User not found",
      });
    }

    const url = await blogURL(data.title);

    const blog = await createNewBlog(data, url, user);

    if (!blog) {
      return res.status(400).json({
        status: false,
        error: "Blog not created",
      });
    }

    res.status(201).json({ status: true, message: "Blog created", blog });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not created",
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const { limit } = req.query;

    const blogs = await getBlogs(limit);
    if (!blogs) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "get blogs successfully",
      blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not found",
    });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const data = req.body;
    const { url } = req.params;
    const { email } = req.user;
    const blog = await getBlogByURL(url);
    if (!blog) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        status: false,
        error: "user not found",
      });
    }

    if (data.title) {
      data.url = await blogURL(data.title);
    }

    const updatedBlog = await editBlog(blog._id, data, user);

    if (!updatedBlog) {
      return res.status(400).json({
        status: false,
        error: "blog not updated",
      });
    }

    res.status(200).json({
      status: true,
      message: "blog updated",
      updatedBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not found",
    });
  }
};

exports.getBlogByURL = async (req, res) => {
  try {
    const { url } = req.params;
    const blog = await getBlogByURL(url);

    if (!blog) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "blog founded",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not found",
    });
  }
};

exports.deleteBlogByURL = async (req, res) => {
  try {
    const { url } = req.params;
    const { email } = req.user;
    const user = await findUserByEmail(email);
    const blog = await getBlogByURL(url);

    if (!blog) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    if (!email) {
      return res.status(400).json({
        status: false,
        error: "user not found",
      });
    }

    const { _id, ...others } = blog.toObject();

    const saveDeleteBlogs = await saveDeleteBlog(others, user);

    if (!saveDeleteBlogs) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    const deleteBlogs = await deleteBlog(_id);

    if (!deleteBlogs) {
      return res.status(400).json({
        status: false,
        error: "blog not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "blog deleted",
      deletedBlog: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "blog not found",
    });
  }
};

exports.totalBlogs = async (req, res) => {
  try {
    const result = await totalBlogs();

    if (!result) {
      return res.status(200).send({
        status: true,
        count: 0,
      });
    }

    res.status(200).send({
      status: true,
      count: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: "Blog not find",
    });
  }
};
