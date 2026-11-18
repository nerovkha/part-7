import { Link } from 'react-router'
import { useLogout, useUser } from '../UserContext'

const Navigation = () => {
  const user = useUser()
  const logout = useLogout()

  const padding = { padding: 5 }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <Link style={padding} to="/new">
            new blog
          </Link>
          <em style={padding}>{user.name} logged in</em>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  )
}

export default Navigation
