const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blog')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

const errorHandler = (error,request,response,next) => {
  console.error(error.name,error.message)
  console.log(error.name)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' }).end()
  } 
  else if (error.name === 'ValidationError') {
    console.log('validation error')
    return response.status(400).json({ error: error.message }).end()
  }
  console.log('something else')
  next(error)
}
app.use(errorHandler)
app.use('/api/blogs', blogRouter)
app.use('/api/users', loginRouter)

module.exports = app