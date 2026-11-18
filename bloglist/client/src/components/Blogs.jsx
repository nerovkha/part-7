import { Link } from 'react-router'
import { useBlogs } from '../hooks/blogs'

const Blogs = () => {
  const result = useBlogs()

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
          </div>
        ))}
    </div>
  )
}

export default Blogs
