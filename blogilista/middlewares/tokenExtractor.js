const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { NotAuthorizedError } = require("../utils/errors");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      throw NotAuthorizedError("Token invalid");
    }
  } else {
    throw NotAuthorizedError("Token missing");
  }
  next();
};

module.exports = tokenExtractor;
