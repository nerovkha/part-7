import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const blog = new Blog({ ...request.body, user: request.user.id })
    const saved = await blog.save()
    request.user.blogs = request.user.blogs.concat(saved._id)
    await request.user.save()
    const populated = await Blog.findById(saved._id).populate('user', {
      username: 1,
      name: 1,
    })
    response.status(201).json(populated)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    blog.comments = blog.comments.concat(request.body.content)
    const updated = await blog.save()
    response.status(201).json(updated)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(204).end()
    }
    if (blog.user && blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete a blog' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    blog.likes = request.body.likes
    const updated = await blog.save()
    await updated.populate('user', { username: 1, name: 1 })
    response.json(updated)
  } catch (error) {
    next(error)
  }
})

export default blogsRouter
