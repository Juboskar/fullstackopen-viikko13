require("express-async-errors");
const router = require("express").Router();
const { User } = require("../models");
const {
  ValueError,
  NotFoundError,
  NotUniqueError,
} = require("../utils/errors");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ where: { username: username } });
  if (user) throw new NotUniqueError(`Username ${username}`);
  const created = await User.create(req.body);
  res.json(created);
});

router.put("/:username", async (req, res) => {
  const name = req.body.name;
  const username = req.params.username;
  if (!name) throw new ValueError("name");
  const user = await User.findOne({ where: { username: username } });
  if (!user) throw new NotFoundError(`User: ${username}`);
  user.name = name;
  const updated = await user.save();
  res.json(updated);
});

module.exports = router;
