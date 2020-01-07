import quizzesService from '../services/quizzes'
import loginService from '../services/login'
import usersService from '../services/users'

const userAtStart = null

// Initialize user from local storage
export const initUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedQuizAppUser'))
  const token = user ? user.token : null
  quizzesService.setToken(token)
  return async dispatch => {
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logInUser = ({ username, password, name }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(user))
    const token = user ? user.token : null
    quizzesService.setToken(token)
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

// Create user and then log him in
export const signUpUser = ({ username, password, name }) => {
  return async dispatch => {
    const user = await usersService.create({ username, password, name })
    const tokenUser = await loginService.login({ username, password })
    window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(tokenUser))
    const token = user ? user.token : null
    quizzesService.setToken(token)
    dispatch({
      type: 'LOG_IN_USER',
      data: user
    })
  }
}

export const logOutUser = () => {
  window.localStorage.setItem('loggedQuizAppUser', JSON.stringify(null))
  quizzesService.setToken(null)
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