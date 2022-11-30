const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title ===undefined || request.body.url===undefined) {
    response.status(400).json({error: 'title or url missing'})
    return 
  }
  const {title, author, url, likes} = request.body
  const user = await User.findOne()  
  const id = user._id                 
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: id
  })
  const populatedBlog = await blog.populate('user', {username: 1, name: 1, id: 1})
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  
  response.status(201).json(savedBlog.toJSON())
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