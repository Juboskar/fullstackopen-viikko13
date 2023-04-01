const jwt = require("jsonwebtoken");
require("express-async-errors");
const { User } = require("../models");

const { SECRET } = require("../utils/config");
const { NotAuthorizedError } = require("../utils/errors");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = jwt.verify(authorization.substring(7), SECRET);

      const user = await User.findOne({
        where: { id: token.id, session: authorization.substring(7) },
      });
      if (!user) throw error;

      req.decodedToken = token;
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
