const { getCollections } = require("../db/connection.js");

module.exports = (req, res, next) => {
  const collections = getCollections();
  req.db = { ...collections };
  next();
};
