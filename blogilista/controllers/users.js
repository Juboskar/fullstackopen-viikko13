require("express-async-errors");
const { Op } = require("sequelize");
const router = require("express").Router();
const { User, Blog } = require("../models");
const {
  ValueError,
  NotFoundError,
  NotUniqueError,
} = require("../utils/errors");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const search = (() => {
    if (req.query.read === "true") return [true];
    if (req.query.read === "false") return [false];
    return [true, false];
  })();

  const id = req.params.id;
  const user = await User.findByPk(id, {
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      through: {
        attributes: { exclude: ["userId", "blogId"] },
        where: {
          read: { [Op.in]: search },
        },
      },
    },
  });
  if (!user) throw new NotFoundError(`User id: ${id}`);

  res.json(user);
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
