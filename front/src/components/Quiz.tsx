import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Problem, getInitSubmissions } from './Problem/Problem'
import { createSubmission } from '../reducers/submissionsReducer'

const paddingStyle = {
  padding: "10px",
}

const Quiz = ({ quiz, user, previousSubmissions, initialSubmissions, createSubmission }) => {
  const [submissions, setSubmissions] = useState (null)
  const [submitted, setSubmitted] = useState (false)

  useEffect(() => { setSubmissions (initialSubmissions) }, [initialSubmissions])
  useEffect(() => { if (previousSubmissions) (setSubmitted (true)) }, [previousSubmissions])

  if (! user ) return <h3 className="d-flex justify-content-center"> Log in to see quiz </h3>
  if (! quiz )  return null 
  if (! submissions ) return null

  const getSubmission = (submissions, problem) => {
    return submissions.find (submission => submission.problemId === problem.id)
  }

  const setSubmission = newSubmission => {
    setSubmissions(submissions.map (submission => 
      submission.problemId === newSubmission.problemId ? newSubmission : submission
    ))
  }

  const submit = async () => {
    await createSubmission ({
        quiz : quiz.id,
        submissions
    })
    setSubmitted (true)
    alert ('Submitted')
  }

  const tryAgain = () => {
    setSubmitted (false)
  }

  return (
    <div className="border border-dark">
      <h2 className="d-flex justify-content-center">{quiz.title}</h2>
      <p className="d-flex justify-content-center">{quiz.description}</p>
      
      {quiz.problems.map (problem => 
        <Problem
          key={problem.id} 
          problem={problem}
          submission={getSubmission(submitted ? previousSubmissions.submissions : submissions, problem)} 
          setSubmission={setSubmission} 
          submitted={submitted}
        />
      )}

      <div className="d-flex justify-content-center" style={paddingStyle}>
        { submitted ? 
          <button className="btn btn-primary" onClick={tryAgain}> {`Try again`} </button> :
          <button className="btn btn-primary" onClick={submit}> {`Submit`} </button> 
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  createSubmission
}

const mapStateToProps = (state, ownProps) => {
  const quiz = state.quizzes.find(quiz => quiz.id === ownProps.id)
  return {
    quiz,
    user: state.user,
    initialSubmissions: quiz ? getInitSubmissions (quiz.problems) : null,
    previousSubmissions: quiz ? state.submissions.sort((a, b) => {
      const dateA = new Date(a.submissionDate).getTime()
      const dateB = new Date(b.submissionDate).getTime()
      return dateA > dateB ? -1 : 1
    }).find (submission => submission.quiz === quiz.id) : null
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)