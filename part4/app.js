const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const getTokenFrom = (request,response,next) => {
  console.log(request)
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
    next()
  }
  return response.status(401).json({ error: 'token missing or invalid' })
} 

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(getTokenFrom())

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
module.exports = app