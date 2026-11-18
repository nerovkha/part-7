import axios from 'axios'

const client = axios.create({ baseURL: '/api' })

export const setToken = (token) => {
  client.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : null
}

export default client
