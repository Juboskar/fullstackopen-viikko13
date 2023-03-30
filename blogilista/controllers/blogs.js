require("express-async-errors");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const url = req.body.url;

  if (!author)
    throw {
      name: "ValueError",
      message: "Missing or incorrect value: author",
    };
  if (!title)
    throw {
      name: "ValueError",
      message: "Missing or incorrect value: title",
    };
  if (!url)
    throw {
      name: "ValueError",
      message: "Missing or incorrect value: url",
    };

  const blog = await Blog.create(req.body);
  res.json(blog);
});

blogsRouter.put("/:id", async (req, res) => {
  const likes = parseInt(req.body.likes);
  if (!likes)
    throw {
      name: "ValueError",
      message: "Missing or incorrect value: likes",
    };
  const blog = await Blog.findByPk(req.params.id);
  if (!blog)
    throw {
      name: "ValueError",
      message: "Blog not found",
    };
  blog.likes = likes;
  const updated = await blog.save();
  res.json(updated);
});

blogsRouter.delete("/:id", async (req, res) => {
  const deleted = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (deleted === 0)
    throw {
      name: "ValueError",
      message: "Blog not found",
    };
  res.sendStatus(204);
});

module.exports = blogsRouter;
