import { useNavigate } from 'react-router'
import { useField } from '../hooks/useField'
import { useLogin } from '../UserContext'
import { useNotify } from '../NotificationContext'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const login = useLogin()
  const notify = useNotify()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username: username.inputProps.value,
        password: password.inputProps.value,
      })
      notify(`welcome ${user.name}`)
      navigate('/')
    } catch {
      notify('wrong username or password')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input name="username" {...username.inputProps} />
        </div>
        <div>
          password
          <input name="password" {...password.inputProps} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
