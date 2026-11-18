import { useNavigate } from 'react-router'
import { useField } from '../hooks/useField'
import { useCreateBlog } from '../hooks/blogs'
import { useNotify } from '../NotificationContext'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const createBlog = useCreateBlog()
  const notify = useNotify()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    }
    createBlog.mutate(newBlog, {
      onSuccess: () => {
        notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
        navigate('/')
      },
      onError: () => {
        notify('failed to add the blog')
      },
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input name="title" {...title.inputProps} />
        </div>
        <div>
          author
          <input name="author" {...author.inputProps} />
        </div>
        <div>
          url
          <input name="url" {...url.inputProps} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
