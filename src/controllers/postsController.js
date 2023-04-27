const {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
} = require("../services/postsService");

const getPostsController = async (req, res) => {
  const { _id: userId } = req.user;

  const posts = await getPosts(userId);
  res.json({ posts, status: "success" });
};

const getPostByIdController = async (req, res) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;

  const post = await getPostById(postId, userId);
  res.json({ post, status: "success" });
};

const addPostController = async (req, res) => {
  const { topic, text } = req.body;
  const { _id: userId } = req.user;

  await addPost({ topic, text, userId });

  res.json({ status: "success" });
};

const changePostController = async (req, res) => {
  const { id: postId } = req.params;
  const { topic, text } = req.body;
  const { _id: userId } = req.user;

  await changePostById(postId, { topic, text }, userId);
  res.json({ status: "success" });
};

const deletePostController = async (req, res) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;

  await deletePostById(postId, userId);

  res.json({ status: "success" });
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
