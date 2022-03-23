const _ = require('lodash');
const totalLikes = (blogs) => {
  const total = blogs.reduce((prev,current) => prev+current.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const highest = blogs.reduce((highest,current) => current.likes>=highest.likes ? current : highest,{'likes':0})
  return highest
}
const mostBlogs = (blogs) => {
  const authors = []
  blogs.map(blog => {
    if (authors.find(b => b.author===blog.author)){ // we have found a user
      authors.find(b => b.author===blog.author).blogs++
    }
    else {
      authors.push({
        author:blog.author,
        blogs:1
      })
    }
  })
  const sortedList = _(authors).sortBy('blogs').value()
  return sortedList[sortedList.length-1]
}
const mostLikes = (blogs) => {
  const authors = []
  blogs.map(blog => {
    if (authors.find(b => b.author===blog.author)){ // we have found a user
      authors.find(b => b.author===blog.author).likes+=blog.likes
    }
    else {
      authors.push({
        author:blog.author,
        likes:0
      })
    }
  })
  const sortedList = _(authors).sortBy('likes').value()
  return sortedList[sortedList.length-1]
}  
module.exports = {
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}
        