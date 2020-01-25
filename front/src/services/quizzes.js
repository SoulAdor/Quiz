import axios from 'axios'
import { getConfig } from './token'
const baseUrl = '/api/quizzes'

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig ())
  return response.data
}

const create = async quiz => {
  const response = await axios.post(baseUrl, quiz, getConfig ())
  return response.data
}

const update = async quiz => {
  const response = await axios.put(`${baseUrl}/${quiz.id}`, quiz, getConfig ())
  return response.data
}

const remove = async quiz => {
  const response = await axios.delete(`${baseUrl}/${quiz.id}`, quiz, getConfig ())
  return response.data
}

export default { getAll, create, update, remove }