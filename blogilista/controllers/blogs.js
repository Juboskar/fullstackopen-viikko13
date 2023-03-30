const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

module.exports = blogsRouter