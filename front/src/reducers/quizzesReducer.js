import quizzesService from '../services/quizzes'

const quizzesAtStart = []

const DBToQuiz = quizDB => {
  if (!quizDB) return null
  const convertedQuiz = {
    ...quizDB, 
    questions : [],
    textQuestions : undefined, 
    multipleChoiceQuestions : undefined, 
    checkboxQuestions : undefined
  }
  quizDB.textQuestions.map (question => convertedQuiz.questions.push ({question, type : "TEXT" }) )
  quizDB.multipleChoiceQuestions.map (question => convertedQuiz.questions.push ({question, type : "MULTIPLE_CHOICE" }) )
  quizDB.checkboxQuestions.map (question => convertedQuiz.questions.push ({question, type : "CHECKBOXES" }) )
  return convertedQuiz
}

const quizToDB = quiz => {
  if (!quiz) return null
  const convertedQuiz = {
    ...quiz, 
    questions : undefined,
    textQuestions : [],
    multipleChoiceQuestions : [],
    checkboxQuestions : []
  }
  quiz.questions.forEach (question => {
    switch(question.type) {
      case "TEXT":
        convertedQuiz.textQuestions.push (question)
        break
      case "MULTIPLE_CHOICE":
        convertedQuiz.multipleChoiceQuestions.push (question)
        break
      case "CHECKBOXES":
        convertedQuiz.checkboxQuestions.push (question)
        break
      default:
        break
    }
  })
  return convertedQuiz
}

const DBToQuizzes = quizzes => {
  return quizzes.map (quiz => DBToQuiz(quiz))
}

export const initQuizzes = () => {
  return async dispatch => {
    const quizzes = await quizzesService.getAll()
    dispatch({
      type: 'INIT_QUIZZES',
      data: DBToQuizzes (quizzes)
    })
  }
}

export const createQuiz = quiz => {
  return async dispatch => {
    const newQuiz = await quizzesService.create(quizToDB (quiz))
    dispatch({
      type: 'NEW_QUIZ',
      data: DBToQuiz (newQuiz),
    })
  }
}

export const updateQuiz = quiz => {
  return async dispatch => {
    const updatedQuiz = await quizzesService.update( quizToDB (quiz) )
    dispatch({
      type: 'UPDATE_QUIZ',
      data: DBToQuiz (updatedQuiz),
    })
  }
}

export const deleteQuiz = quiz => {
  return async dispatch => {
    await quizzesService.remove( quizToDB (quiz) )
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