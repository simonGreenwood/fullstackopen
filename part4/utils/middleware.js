const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = async (request,response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findOne({"username": decodedToken.username, "id": decodedToken.id})
    console.log(decodedToken.id)
    console.log(user)
    request.user = user
    next()
  }
  else {
    next()
    return
  }
} 
 

module.exports = {tokenExtractor}