require("express-async-errors");
const router = require("express").Router();
const { Reading } = require("../models");
const { ValueError, NotFoundError } = require("../utils/errors");

router.post("/", async (req, res) => {
  const blogId = req.body.blog_id;
  const userId = req.body.user_id;

  if (!blogId) throw new ValueError("blog id");
  if (!userId) throw new ValueError("user id");

  try {
    const reading = await Reading.create({ userId, blogId });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError")
      throw NotFoundError("blog or user");
  }

  res.json(reading);
});

module.exports = router;
