const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userExtractor = async (request,response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    try {
      jwt.verify(authorization.substring(7),process.env.SECRET)
    } catch {
      return response.status(401).json({ error: 'token invalid' })
    }
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    const user = await User.findOne({"username": decodedToken.username, "id": decodedToken.id})
    request.user = user
    next()
  }
  else {
    next()
    return
  }
} 
 

module.exports = {userExtractor}