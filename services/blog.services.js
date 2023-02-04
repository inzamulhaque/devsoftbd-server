const Blog = require("../models/Blog");
const DeleteBlog = require("../models/DeleteBlog");

exports.createNewBlog = async (data, url, user) => {
  return await Blog.create({
    url,
    ...data,
    "author.name": user.name,
    "author.email": user.email,
    "author.id": user._id,
  });
};

exports.getBlogs = async (limit) => {
  return Blog.find().sort({ createdAt: "descending" }).limit(limit);
};

exports.getBlogByURL = async (url) => {
  return Blog.findOne({ url });
};

exports.editBlog = async (id, data, user) => {
  return Blog.findByIdAndUpdate(
    { _id: id },
    {
      ...data,
      $push: { editBy: { name: user.name, id: user._id } },
    }
  );
};

exports.saveDeleteBlog = async (others, user) => {
  return DeleteBlog.create({
    ...others,
    deleteBy: { name: user.name, email: user.email, id: user._id },
  });
};

exports.deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

exports.totalBlogs = async () => {
  return await Blog.countDocuments({ status: "unseen" });
};
