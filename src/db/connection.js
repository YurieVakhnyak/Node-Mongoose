const mongoose = require("mongoose");

const getCollections = () => {
  return collections;
};

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};

module.exports = {
  connectMongo,
  getCollections,
};
