import axios from 'axios'
import { getToken } from './token'
const baseUrl = '/api/quizzes'

const getAll = async () => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async quiz => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.post(baseUrl, quiz, config)
  return response.data
}

const update = async quiz => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.put(`${baseUrl}/${quiz.id}`, quiz, config)
  return response.data
}

const remove = async quiz => {
  const config = { headers: { Authorization: getToken() } }
  const response = await axios.delete(`${baseUrl}/${quiz.id}`, quiz, config)
  return response.data
}

export default { getAll, create, update, remove }