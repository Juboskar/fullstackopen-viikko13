require("express-async-errors");
const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, User } = require("../models");
const tokenExtractor = require("../middlewares/tokenExtractor");
const {
  ValueError,
  NotFoundError,
  NotAuthorizedError,
} = require("../utils/errors");

router.get("/", async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where: {
      [Op.or]: {
        author: {
          [Op.iLike]: `%${search}%`,
        },
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
    },
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const url = req.body.url;

  if (!author) throw new ValueError("author");
  if (!title) throw new ValueError("title");
  if (!url) throw new ValueError("url");

  const user = await User.findByPk(req.decodedToken.id);
  if (user.disabled) throw NotAuthorizedError("Account not available");

  const blog = await Blog.create({ ...req.body, userId: user.id });

  res.json(blog);
});

router.put("/:id", async (req, res) => {
  const likes = parseInt(req.body.likes);
  const id = req.params.id;
  if (!likes) throw new ValueError("likes");
  const blog = await Blog.findByPk(id);
  if (!blog) throw new NotFoundError(`Blog id: ${id}`);
  blog.likes = likes;
  const updated = await blog.save();
  res.json(updated);
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  console.log(user.disabled);
  if (user.disabled) throw NotAuthorizedError("Account not available");

  const id = req.params.id;
  const deleted = await Blog.destroy({
    where: {
      id: id,
      userId: user.id,
    },
  });
  if (deleted === 0) throw new NotFoundError(`Blog id: ${id}`);
  res.sendStatus(204);
});

module.exports = router;
