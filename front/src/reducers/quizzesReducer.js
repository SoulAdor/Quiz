import quizzesService from '../services/quizzes'

const quizzesAtStart = []

export const initQuizzes = () => {
  return async dispatch => {
    const quizzes = await quizzesService.getAll()
    dispatch({
      type: 'INIT_QUIZZES',
      data: quizzes
    })
  }
}

export const createQuiz = quiz => {
  return async dispatch => {
    const newQuiz = await quizzesService.create(quiz)
    dispatch({
      type: 'NEW_QUIZ',
      data: newQuiz,
    })
  }
}

export const updateQuiz = quiz => {
  return async dispatch => {
    const updatedQuiz = await quizzesService.update(quiz)
    dispatch({
      type: 'UPDATE_QUIZ',
      data: updatedQuiz,
    })
  }
}

export const deleteQuiz = quiz => {
  return async dispatch => {
    await quizzesService.remove(quiz)
    dispatch({
      type: 'DELETE_QUIZ',
      data: quiz,
    })
  }
}

const reducer = (state = quizzesAtStart, action) => {
  switch (action.type) {
  case 'INIT_QUIZZES':
    return action.data
  case 'NEW_QUIZ': {
    const newQuiz = action.data
    return [...state, newQuiz]
  }
  case 'UPDATE_QUIZ': {
    const updatedQuiz = action.data
    return state.map (quiz => quiz.id === updatedQuiz.id ? updatedQuiz : quiz)
  }
  case 'DELETE_QUIZ': {
    const deletedQuiz = action.data
    return state.filter (quiz => quiz.id !== deletedQuiz.id)
  }
  default:
    return state
  }
}

export default reducer