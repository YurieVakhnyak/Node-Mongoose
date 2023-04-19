const { Post } = require("../db/postModel");

const getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json({ post, status: "success" });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;
  const post = new Post({ topic, text });
  await post.save();
  res.json({ status: "success" });
};

const changePost = async (req, res) => {
  const { id } = req.params;
  const { topic, text } = req.body;
  await Post.findByIdAndUpdate(id, { $set: { topic, text } });
  res.json({ status: "success" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndRemove(id);
  res.json({ status: "success" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
