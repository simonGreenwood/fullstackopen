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
})
