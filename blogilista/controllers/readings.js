require("express-async-errors");
const router = require("express").Router();
const { Reading } = require("../models");
const { ValueError } = require("../utils/errors");

router.post("/", async (req, res) => {
  const blogId = req.body.blog_id;
  const userId = req.body.user_id;

  if (!blogId) throw new ValueError("blog id");
  if (!userId) throw new ValueError("user id");

  const reading = await Reading.create({ userId, blogId });
  res.json(reading);
});

module.exports = router;
