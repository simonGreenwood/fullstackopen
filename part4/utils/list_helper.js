const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ?  blog : favorite, blogs[0])
}
const mostBlogs = (blogs) => {
  const topAuthor = Object.entries(_.countBy(blogs, 'author')).slice(-1)[0]
  return {"author": topAuthor[0], "blogs": topAuthor[1]}
}
const mostLikes = (blogs) => {
  const mostLikes = _.map(_.countBy(blogs, 'likes'))
  console.log(mostLikes)
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}