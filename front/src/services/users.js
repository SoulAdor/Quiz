import axios from 'axios'
import { getToken } from './token'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async user => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.post(baseUrl, user, config)
  return response.data
}

const update = async user => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.put(`${baseUrl}/${user.id}`, user, config)
  return response.data
}

const remove = async user => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.delete(`${baseUrl}/${user.id}`, user, config)
  return response.data
}

export default { getAll, create, update, remove }