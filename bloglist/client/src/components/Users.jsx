import { Link } from 'react-router'
import { useUsers } from '../hooks/users'

const Users = () => {
  const result = useUsers()

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>user service not available due to problems in server</div>
  }

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
