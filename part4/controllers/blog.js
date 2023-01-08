const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const app = require("../app")
const jwt = require("jsonwebtoken")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  if (
    request.body.title === "" ||
    request.body.title === undefined ||
    request.body.url === "" ||
    request.body.url === undefined
  ) {
    return response.status(400).json({ error: "title or url missing" })
  }
  if (!request.user) {
    return response.status(401).json({ error: "invalid token" })
  }
  const { title, author, url, likes } = request.body

  const user = await User.findOne({
    username: request.user.username,
    id: request.user.id,
  })

  const id = user._id
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: id,
  })
  const populatedBlog = await blog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: "blog not found" })
  }
  if (!request.user) {
    return response.status(401).json({ error: "invalid token" })
  }
  if (blog.user.toString() === request.user.id) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } catch (exception) {
      return response.status(400).end()
    }
  }
  return response.status(401).end()
})

// handler of requests with result to errors

blogRouter.put("/:id", async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    if (!updatedBlog) {
      response.status(400).end()
      return
    }
    console.log(updatedBlog)
    response.status(200).json(updatedBlog).end()
  } catch (exception) {
    response.status(400).end()
  }
})

blogRouter.post("/:id/comments", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const comment = request.body.comment
  if (!blog) {
    return response.status(400).json({ error: "blog not found" })
  }
  if (!comment) {
    return response.status(400).json({ error: "comment missing" })
  }
  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog.toJSON())
})

module.exports = blogRouter
