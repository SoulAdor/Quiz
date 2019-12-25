import axios from 'axios'
const baseUrl = '/quizzes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async quiz => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, quiz, config)
  return response.data
}

const update = async quiz => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${quiz.id}`, quiz, config)
  return response.data
}

const remove = async quiz => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${quiz.id}`, quiz, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }