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