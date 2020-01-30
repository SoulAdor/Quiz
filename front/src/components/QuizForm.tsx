import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import { useCounter } from '../hooks/useCounter'
import { createQuiz } from '../reducers/quizzesReducer'
import { SubmissionType, getProblem, Problem } from './ProblemForm/Problem'

const paddingStyle = {
  padding: "10px",
}

const CreateQuiz = ({ user, createQuiz, history }) => {
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState ('')
  const [problems, setProblems] = useState ([])
  const idCounter = useCounter (1)

  
  if (! user ) return <h3 className="d-flex justify-content-center"> Log in to create quiz </h3>

  const setProblem = updatedProblem => {
    setProblems (problems.map (problem => problem.id === updatedProblem.id ? updatedProblem : problem))
  }

  const addProblem = (submissionType : SubmissionType) => {
    const problem = getProblem (idCounter.nextValue(), submissionType)
    setProblems ([...problems, problem])
  }

  const create = async () => {
    const newQuiz = { title, description, problems }
    await createQuiz(newQuiz)
    alert('Your quiz has been added to database')
    history.push('/')
  }

  return (
    <div>
      <h2 className='text-info d-flex justify-content-center' style={paddingStyle}> Create new quiz </h2>
      <h3 className='d-flex justify-content-center' style={paddingStyle}> Title: </h3>
      <input className="form-control" type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' placeholder="Enter title"/>

      <h3 className='d-flex justify-content-center' style={paddingStyle}> Description: </h3>
      <textarea className="form-control" rows={10} value={description} onChange={({ target }) => setDescription(target.value)} placeholder="Enter description"/>

      {problems.map (problem => 
        <div key = {problem.id} style={paddingStyle}>
          <Problem  problem={problem} setProblem={setProblem}/>
        </div>
      )}
      
      <h3 className='d-flex justify-content-center' style={paddingStyle}> Add answers: </h3>
      <div className='d-flex justify-content-around' style={paddingStyle}>
        <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.Text) }> {`Text`} </button>
        <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.RadioButton) }> {`RadioButton`} </button>
        <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.Checkbox) }> {`Checkbox`} </button>
      </div>

      <div className='d-flex justify-content-center' style={paddingStyle}>
        <button className="btn btn-primary" type="submit"  onClick={create}> {`Create`} </button>
      </div>

    </div>
  )
}

CreateQuiz.propTypes = {
  createQuiz: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createQuiz,
  getProblem
}

export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuiz) )