const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const app = require('../app')
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title ===undefined || request.body.url===undefined) {
    console.log("somethings undefined!")
    response.status(400).json({error: 'title or url missing'})
    return 
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})
module.exports = blogRouter