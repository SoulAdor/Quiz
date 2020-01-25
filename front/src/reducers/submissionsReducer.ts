import submissionsService from '../services/submissions'

const submissionsAtStart = []

export const resetSubmissions = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_SUBMISSIONS'
    })
  }
}

export const initSubmissions = () => {
  return async dispatch => {
    const submissions = await submissionsService.getAll()
    dispatch({
      type: 'INIT_SUBMISSIONS',
      data: submissions
    })
  }
}

export const createSubmission = submission => {
  return async dispatch => {
    const newSubmission = await submissionsService.create(submission)
    dispatch({
      type: 'NEW_SUBMISSION',
      data: newSubmission
    })
  }
}

const reducer = (state = submissionsAtStart, action) => {
  switch (action.type) {
  case 'INIT_SUBMISSIONS':
    return action.data  
  case 'RESET_SUBMISSIONS':
    return submissionsAtStart
  case 'NEW_SUBMISSION': {
    const newSubmission = action.data
    return [...state, newSubmission]
  }
  case 'UPDATE_SUBMISSION': {
    const updatedSubmission = action.data
    return state.map (submission => submission.id === updatedSubmission.id ? updatedSubmission : submission)
  }
  case 'DELETE_SUBMISSION': {
    const deletedSubmission = action.data
    return state.filter (submission => submission.id !== deletedSubmission.id)
  }
  default:
    return state
  }
}

export default reducer