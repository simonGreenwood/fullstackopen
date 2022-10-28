const helper = require('../utils/blog_helper')
const Blog = require('../models/blog')

const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(note => new Blog(note))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('blog tests', () => {
  test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(response)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test("create a new blog", async () => {
    const newBlog = {
      title: "test blog",
      author: "simon",
      url: "www.example.com",
      likes: 420

    }
    
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs.body.map(blog => blog.title)).toContain("test blog")


  })
  test("if likes is missing, default to 0", async () => {
    const newBlog = {
      title: "test blog",
      author: "simon",
      url: "www.example.com",
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[blogs.body.length - 1].likes).toBe(0)
  })
  test("if title and url are missing, return 400", async () => {  
    const newBlog = {
      "author": "simon"
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const startingBlogs = await Blog.find({})
    const target = startingBlogs[0]

    await api
      .delete(`/api/blogs/${target.id}`)
      .expect(204)

    const after = await Blog.find({})
    expect(after).toHaveLength(startingBlogs.length - 1)
    expect(after).not.toContain(target)
  })
  
  test('fails with status code 400 if id is invalid', async () => {
    const startingBlogs = await Blog.find({})
    await api
      .delete(`/api/blogs/invalidid`)
      .expect(400)
    const after = await Blog.find({})
      
  },100000)
 
})
describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const startingBlogs = await Blog.find({})
    const target = startingBlogs[0]
    const newBlog = {
      title: "test blog",
      author: "simon",
      url: "www.examplee.com",
      likes: 100000
    }
    await api.put(`/api/blogs/${target.id}`)
      .send(newBlog)
      .expect(200)
    const after = await Blog.find({})
    expect(after).toHaveLength(startingBlogs.length) 
    expect(after.map(blog => blog.title)).toContain("test blog")
    expect(after.map(blog => blog.author)).toContain("simon")
    expect(after.map(blog => blog.url)).toContain("www.examplee.com")
    expect(after.map(blog => blog.likes)).toContain(100000)
  })
})