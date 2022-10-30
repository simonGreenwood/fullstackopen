const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const app = require('../app')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title ===undefined || request.body.url===undefined) {
    response.status(400).json({error: 'title or url missing'})
    return 
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})


blogRouter.delete('/:id', async (request, response, next) => {
  try {
    Blog.findByIdAndRemove(request.params.id)
    if (!updatedBlog) {
      response.status(400).end()
      return
    }
    response.status(204).end()
  } catch (exception) {
    response.status(400).end()
  }
})

// handler of requests with result to errors

blogRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    if (!updatedBlog) {
      response.status(400).end()
      return
    }
    console.log(updatedBlog)
    response.status(200).json(updatedBlog).end()
  }
  catch (exception) {
    response.status(400).end()
  }
})
module.exports = blogRouter