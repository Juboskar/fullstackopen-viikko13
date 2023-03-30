require("express-async-errors");
const router = require("express").Router();
const { User } = require("../models");
const { NotFoundError, NotUniqueError } = require("../utils/errors");

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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError(`User: ${id}`);
});

module.exports = router;
