import { setToken } from '../services/token'
import loginService from '../services/login'
import usersService from '../services/users'
import { resetSubmissions } from './submissionsReducer'

const userAtStart = null

export const initUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedQuizAppUser'))
  const token = user ? user.token : null
  setToken(token)
  return async dispatch => {
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logInUser = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(user))
    const token = user ? user.token : null
    setToken(token)
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

// Create user and then log him in
export const signUpUser = ({ username, password, name }) => {
  return async dispatch => {
    await usersService.create({ username, password, name })
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(user))
    const token = user ? user.token : null
    setToken(token)
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logOutUser = () => {
  window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(null))
  setToken(null)
  resetSubmissions()
  return async dispatch => {
    dispatch({
      type: 'LOG_OUT_USER'
    })
  }
}

const reducer = (state = userAtStart, action) => {
  switch (action.type) {
  case 'LOG_IN_USER':
    return action.data
  case 'LOG_OUT_USER':
    return userAtStart
  default:
    return state
  }
}

export default reducer