import express from 'express'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long',
      })
    }

    const existing = await User.findOne({ username })
    if (existing) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const passwordHash = await User.hashPassword(password)
    const user = new User({ username, name, passwordHash })
    const saved = await user.save()
    response.status(201).json(saved)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
