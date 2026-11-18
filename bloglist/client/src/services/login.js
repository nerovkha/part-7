import client from './requests'

const login = async (credentials) => {
  const response = await client.post('/login', credentials)
  return response.data
}

export default { login }
