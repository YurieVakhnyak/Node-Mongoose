const ObjectId = require("mongodb").ObjectId;
const { connectMongo } = require("../db/connection");

const getPosts = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray();
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await req.db.Posts.findOne({ _id: new ObjectId(id) });
  res.json({ post, status: "success" });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;

  await req.db.Posts.insertOne({ topic, text });
  res.json({ status: "success" });
};

const changePost = async (req, res) => {
  const { id } = req.params;
  const { topic, text } = req.body;
  await req.db.Posts.updateOne(
    { _id: new ObjectId(id) },
    { $set: { topic, text } }
  );
  res.json({ status: "success" });
  // const { topic, text } = req.body;
  // posts.forEach((post) => {
  //   if (post.id === req.params.id) {
  //     post.topic = topic;
  //     post.text = text;
  //   }
  // });
  // res.json({ status: "success" });
};

const patchPost = async (req, res) => {};
const deletePost = async (req, res) => {
  const { id } = req.params;

  await req.db.Posts.deleteOne({ _id: new ObjectId(id) });
  res.json({ status: "success" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
