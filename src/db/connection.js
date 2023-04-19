const MongoClient = require("mongodb").MongoClient;
const collections = {};
// const collections = require("./collections");

const getCollections = () => {
  return collections;
};
// const collections = require("./collections.js");

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  // collections.Posts = db.collection("posts");
  collections.Posts = db.collection("posts");
  // return { Posts };
};

module.exports = {
  connectMongo,
  getCollections,
};
