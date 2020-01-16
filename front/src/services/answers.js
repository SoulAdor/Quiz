import axios from 'axios'
import { getToken } from './token'
const baseUrl = '/api/answers'

const getAll = async () => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async answer => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.post(baseUrl, answer, config)
  return response.data
}

const update = async answer => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.put(`${baseUrl}/${answer.id}`, answer, config)
  return response.data
}

const remove = async answer => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.delete(`${baseUrl}/${answer.id}`, answer, config)
  return response.data
}

export default { getAll, create, update, remove }