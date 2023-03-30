const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  blog.likes = parseInt(req.body.likes);
  blog.save()
  res.json(blog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(204);
});

module.exports = blogsRouter;
