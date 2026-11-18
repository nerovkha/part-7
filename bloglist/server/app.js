import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'
import { errorHandler, tokenExtractor, userExtractor } from './utils/middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../client/dist')
  app.use(express.static(dist))
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use((request, response, next) => {
  if (
    request.method === 'GET' &&
    !request.path.startsWith('/api') &&
    process.env.NODE_ENV === 'production'
  ) {
    return response.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
  }
  next()
})

app.use(errorHandler)

export default app
