require("express-async-errors");
const router = require("express").Router();
const { Reading } = require("../models");
const {
  ValueError,
  NotFoundError,
  NotUniqueError,
} = require("../utils/errors");

router.post("/", async (req, res) => {
  const blogId = req.body.blog_id;
  const userId = req.body.user_id;

  if (!blogId) throw new ValueError("blog id");
  if (!userId) throw new ValueError("user id");

  existing = await Reading.findOne({ where: { userId, blogId } });
  if (existing)
    throw NotUniqueError(
      `Reading item by given values blog_id: ${blogId} user_id: ${userId}`
    );

  try {
    const reading = await Reading.create({ userId, blogId });
    res.json(reading);
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError")
      throw NotFoundError("blog or user");
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  const read = req.body.read;
  const id = req.params.id;
  if ((read !== false) & !read) throw new ValueError("read");
  const reading = await Reading.findByPk(id);
  if (!reading) throw new NotFoundError(`Reading id: ${id}`);
  reading.read = read;
  const updated = await reading.save();
  res.json(updated);
});

module.exports = router;
