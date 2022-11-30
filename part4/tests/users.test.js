const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({username: 'root', name: 'root', passwordHash: passwordHash})
  await user.save()
})
test('create a user', async () => {
  const response = await api.post('/api/users')
    .send({
        username: 'test',
        name: 'test',
        password: 'test'
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  //make sure username is test
  expect(response.body.username).toBe('test')
  expect(response.body.name).toBe('test')
  expect(response.body.passwordHash).toBe(undefined)
})


test('create a user with no username', async () => {
  const response = await api.post('/api/users')
    .send({
        name: 'test',
        password: 'test'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(response.body.error).toBe('username or password missing')
})
test('create a user with no password', async () => {
  const response = await api.post('/api/users')
    .send({
        username: 'test',
        name: 'test',
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(response.body.error).toBe('username or password missing')
})

test('get all users',() => {
  api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      expect(response.body.length).toBe(1)
      expect(response.body[0].username).toBe('root')
      expect(response.body[0].name).toBe('root')
      expect(response.body[0].passwordHash).toBe(undefined)
    })
})

describe('length is too short', () => {
  test('username is too short', async () => {
    await api.post('/api/users')
      .send({
        username: 'te',
        name: 'test',
        password: 'test'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('password length is too short',() => {
    api.post('/api/users')
      .send({
          username: 'test',
          name: 'test',
          password: 'te'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({error: 'password must be at least 3 characters long'})
  })
})