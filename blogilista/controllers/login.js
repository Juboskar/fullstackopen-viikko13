require("express-async-errors");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { ValueError, NotAuthorizedError } = require("../utils/errors");
const { SECRET } = require("../utils/config");
const User = require("../models/user");

router.post("/", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  if (!username) throw ValueError("username");
  if (!password) throw ValueError("password");

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) throw ValueError("username");
  if (user.disabled) throw NotAuthorizedError("Account not available");

  const passwordCorrect = password === "salainen";

  if (!passwordCorrect) throw ValueError("password");

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
