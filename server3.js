const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const { postRouter } = require("./src/routers/postsRouter.js");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/posts", postRouter);

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const Posts = db.collection("posts");
  const posts = await Posts.find({}).toArray();
  console.log(posts);

  app.listen(PORT, (err) => {
    if (err) {
      console.error("Error at a server launch:", err);
    }
    console.log(`Server works at port: ${PORT}`);
  });
};

start();
