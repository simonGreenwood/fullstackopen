const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = require('../app')

loginRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log(username,name,passwordHash)
  const user = new User({
    username, 
    name, 
    passwordHash
  })
  user.save()
  console.log(user)
  response.status(201).json(user.toJSON()).end()

})
module.exports = loginRouter