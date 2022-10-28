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
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).end()
  }
})
const errorHandler = (error, request, response, next) => {
  console.log(error.name)
}

// handler of requests with result to errors
blogRouter.use(errorHandler)

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedBlog).end()
  }
  catch (exception) {
    response.status(400).end()
    next(exception)
  }
})
module.exports = blogRouter