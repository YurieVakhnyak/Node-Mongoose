const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new NotAuthorizedError(
        "Please, provide a token in the request authorization header"
      );
    }
    const [, token] = authorization.split(" ");

    if (!token) {
      throw new NotAuthorizedError("Please, provide a token");
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authMiddleware,
};
