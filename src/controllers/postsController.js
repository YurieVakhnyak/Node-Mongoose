const {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
} = require("../services/postsService");

const getPostsController = async (req, res) => {
  const posts = await getPosts();
  res.json({ posts, status: "success" });
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await getPostById(id);
  res.json({ post, status: "success" });
};

const addPostController = async (req, res) => {
  const { topic, text } = req.body;
  await addPost({ topic, text });

  res.json({ status: "success" });
};

const changePostController = async (req, res) => {
  const { id } = req.params;
  const { topic, text } = req.body;
  await changePostById(id, { topic, text });
  res.json({ status: "success" });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;

  await deletePostById(id);

  res.json({ status: "success" });
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
