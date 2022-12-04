const getTokenFrom = (request,response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
    next()
    return
  }
  return response.status(401).json({ error: 'token missing or invalid' })

} 
 

module.exports = {getTokenFrom}