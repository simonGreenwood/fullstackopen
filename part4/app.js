const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const blogRouter = require('./controllers/blog')
const mongoUrl = 'mongodb://127.0.0.1:27017/fullstack-blog'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app