import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import { useCounter } from '../hooks/useCounter'
import { createQuiz } from '../reducers/quizzesReducer'

import { SubmissionType, getProblem, Problem } from './ProblemForm/Problem'

import { Form } from 'react-bootstrap'

const CreateQuiz = ({ createQuiz, history }) => {
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState ('')
  const [problems, setProblems] = useState ([])
  const idCounter = useCounter (1)

  const setProblem = updatedProblem => {
    setProblems (problems.map (problem => problem.id === updatedProblem.id ? updatedProblem : problem))
  }

  const addProblem = (submissionType : SubmissionType) => {
    const problem = getProblem (idCounter.nextValue(), submissionType)
    setProblems ([...problems, problem])
  }

  const create = async () => {
    const newQuiz = { title, description, problems }
    console.log(newQuiz)
    // await createQuiz(newQuiz)
    // alert('Your quiz has been added to database')
    // history.push('/')
  }
  
  return (
    <div>
      <h2 className='text-info'> Create new quiz </h2>
      <Form.Label> Title: </Form.Label>
      <Form.Control type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' placeholder="Enter title"/>

      <Form.Label> Description: </Form.Label>
      <Form.Control as='textarea' value={description} onChange={({ target }) => setDescription((target as HTMLTextAreaElement).value)} rows='10' placeholder="Enter description"/>

      {problems.map (problem => <Problem key = {problem.id} problem={problem} setProblem={setProblem}/>)}

      <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.Text) }> {`Text`} </button>
      <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.RadioButton) }> {`RadioButton`} </button>
      <button className="btn btn-primary" type="submit" onClick={() => addProblem (SubmissionType.Checkbox) }> {`Checkbox`} </button>

      <div>
        <button className="btn btn-primary" type="submit"  onClick={create}> {`Create`} </button>
      </div>

    </div>
  )
}

CreateQuiz.propTypes = {
  createQuiz: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createQuiz
}

export default withRouter (connect(
  null,
  mapDispatchToProps
)(CreateQuiz) )