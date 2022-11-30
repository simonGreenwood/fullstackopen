const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
beforeEach(async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({username: 'root', name: 'root', passwordHash: passwordHash})
  await user.save()
})

test('login as user', async () => {
  const response = await api.post('/api/login')
    .send({
        username: 'root',
        name: "root",
        password: 'sekret'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.username).toBe('root')
  expect(response.body.name).toBe('root')
  expect(response.body.passwordHash).toBe(undefined)
  const user = await User.findOne({username:'root'})
  const passwordCorrect = user === null
  ? false
  : await bcrypt.compare('sekret', user.passwordHash)
  expect(passwordCorrect).toBe(true)
})
