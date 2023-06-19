const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  topic: {
    type: String,
    requared: true,
    unique: true,
  },
  userId: {
    type: String,
    unique: false,
  },
  text: {
    type: String,
    requared: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
