import axios from 'axios'
import { getConfig } from './token'
const baseUrl = '/api/submissions'

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig ())
  return response.data
}

const create = async submission => {
  const response = await axios.post(baseUrl, submission, getConfig ())
  return response.data
}

const update = async submission => {
  const response = await axios.put(`${baseUrl}/${submission.id}`, submission, getConfig ())
  return response.data
}

const remove = async submission => {
  const response = await axios.delete(`${baseUrl}/${submission.id}`, submission, getConfig ())
  return response.data
}

export default { getAll, create, update, remove }