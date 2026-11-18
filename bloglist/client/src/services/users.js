import client from './requests'

const getAll = async () => {
  const response = await client.get('/users')
  return response.data
}

export default { getAll }
