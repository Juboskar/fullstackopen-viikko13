const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.json(blog)
})

blogsRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    const incrementResult = await blog.increment('likes');
    res.json(incrementResult)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send(204)
})

module.exports = blogsRouter