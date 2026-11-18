import client from './requests'

const getAll = async () => {
  const response = await client.get('/blogs')
  return response.data
}

const create = async (newBlog) => {
  const response = await client.post('/blogs', newBlog)
  return response.data
}

const update = async (blog) => {
  const response = await client.put(`/blogs/${blog.id}`, blog)
  return response.data
}

const remove = async (id) => {
  await client.delete(`/blogs/${id}`)
}

const addComment = async (id, content) => {
  const response = await client.post(`/blogs/${id}/comments`, { content })
  return response.data
}

export default { getAll, create, update, remove, addComment }
