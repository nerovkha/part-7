import jwt from 'jsonwebtoken'
import config from './config.js'
import User from '../models/user.js'

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    try {
      const decodedToken = jwt.verify(request.token, config.SECRET)
      request.user = await User.findById(decodedToken.id)
    } catch {
      request.user = null
    }
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  }
  next(error)
}

export { tokenExtractor, userExtractor, errorHandler }
