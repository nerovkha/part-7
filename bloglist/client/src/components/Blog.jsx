import { useParams } from 'react-router'
import {
  useAddComment,
  useBlogs,
  useLikeBlog,
  useRemoveBlog,
} from '../hooks/blogs'
import { useNotify } from '../NotificationContext'
import { useUser } from '../UserContext'

const Blog = () => {
  const id = useParams().id
  const result = useBlogs()
  const likeBlog = useLikeBlog()
  const removeBlog = useRemoveBlog()
  const addComment = useAddComment()
  const notify = useNotify()
  const user = useUser()

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blog = result.data.find((blog) => blog.id === id)

  if (!blog) {
    return <div>blog not found</div>
  }

  const handleLike = () => {
    likeBlog.mutate({ ...blog, likes: blog.likes + 1 })
    notify(`you liked '${blog.title}'`)
  }

  const handleRemove = () => {
    removeBlog.mutate(blog.id)
    notify(`you removed '${blog.title}'`)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    addComment.mutate({ id: blog.id, content })
    event.target.reset()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user && blog.user && blog.user.id === user.id && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <label>
            comment
            <input name="comment" />
          </label>
        </div>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
