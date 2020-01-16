import answersService from '../services/answers'

const answersAtStart = []

export const resetAnswers = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_ANSWERS'
    })
  }
}

export const initAnswers = () => {
  return async dispatch => {
    const answers = await answersService.getAll()
    dispatch({
      type: 'INIT_ANSWERS',
      data: answers
    })
  }
}

export const createAnswer = answer => {
  return async dispatch => {
    const newAnswer = await answersService.create(answer)
    dispatch({
      type: 'NEW_ANSWER',
      data: newAnswer
    })
  }
}

const reducer = (state = answersAtStart, action) => {
  switch (action.type) {
  case 'INIT_ANSWERS':
    return action.data  
  case 'RESET_ANSWERS':
    return answersAtStart
  case 'NEW_ANSWER': {
    const newAnswer = action.data
    return [...state, newAnswer]
  }
  case 'UPDATE_ANSWER': {
    const updatedAnswer = action.data
    return state.map (answer => answer.id === updatedAnswer.id ? updatedAnswer : answer)
  }
  case 'DELETE_ANSWER': {
    const deletedAnswer = action.data
    return state.filter (answer => answer.id !== deletedAnswer.id)
  }
  default:
    return state
  }
}

export default reducer