const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = require('../app')

loginRouter.post('/', async (request, response,next) => {
  const {username, name, password} = request.body
  if(!username || !password){
    return response.status(400).json({error: 'username or password missing'}).end()
  }
  if (password.length < 3) {
    return response.status(400).json({error: 'password must be at least 3 characters long'}).end()
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username, 
    name, 
    passwordHash
  })
  try {
    await user.save()
    response.status(201).json(user.toJSON())
  } catch (error) {
    console.log('error')
    next(error)
  }

})
module.exports = loginRouter