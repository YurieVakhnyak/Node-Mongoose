const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  // TODO: typeToken validation
  const [, token] = req.headers["authorization"].split(" ");
  try {
    if (!token) {
      next(new NotAuthorizedError("Please, provide a token"));
    }
  } catch (err) {
    next(new NotAuthorizedError("Invalid token"));
  }
  const user = jwt.decode(token, process.env.JWT_SECRET);
  req.token = token;
  req.user = user;

  next();
};

module.exports = {
  authMiddleware,
};
