import { useParams } from 'react-router'
import { useUsers } from '../hooks/users'

const User = () => {
  const id = useParams().id
  const result = useUsers()

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>user service not available due to problems in server</div>
  }

  const user = result.data.find((user) => user.id === id)

  if (!user) {
    return <div>user not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
