require("express-async-errors");
const router = require("express").Router();
const { Op, fn, col } = require("sequelize");
const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [fn("COUNT", col("id")), "blogs"],
      [fn("SUM", col("likes")), "likes"],
    ],
  });
  res.json(authors);
});

module.exports = router;
