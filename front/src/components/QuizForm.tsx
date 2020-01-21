import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import { useCounter } from '../hooks/useCounter'
import { createQuiz } from '../reducers/quizzesReducer'

import TextSubmission from './SubmissionForms/Text'
import RadioButtonSubmission from './SubmissionForms/RadioButton'
import CheckboxSubmission from './SubmissionForms/Checkbox'

import TextStatement from './StatementForms/Text'

import { Form } from 'react-bootstrap'

enum ProblemType {
  Text,
  RadioButton,
  Checkbox
}

const CreateQuiz = ({ createQuiz, history }) => {
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState ('')
  const [problems, setProblems] = useState ([])
  const idCounter = useCounter (1)

  const setProblem = updatedProblem => {
    setProblems (problems.map (problem => problem.id === updatedProblem.id ? updatedProblem : problem))
  }

  const addProblem = problem => {
    setProblems ([...problems, problem])
  }

  const addTextProblem = () => {
    const problem = {
      id : idCounter.nextValue(),
      statement : '',
      submission: {
        type : ProblemType.Text
      }
    }
    addProblem (problem)
  }

  const addRadioButtonProblem = () => {
    const problem = {
      id : idCounter.nextValue(),
      statement : '',
      submission: {
        type : ProblemType.RadioButton,
        options : []
      }
    }
    addProblem (problem)
  }

  const addCheckboxProblem = () => {
    const problem = {
      id : idCounter.nextValue(),
      statement : '',
      submission: {
        type : ProblemType.Checkbox,
        options : []
      }
    }
    addProblem (problem)
  }

  const create = async () => {
    const newQuiz = { title, description, problems }
    console.log(newQuiz)
    // await createQuiz(newQuiz)
    // alert('Your quiz has been added to database')
    // history.push('/')
  }

  const getTextComponent = (submission, setSubmission) => (
    <TextSubmission submission={submission} setSubmission={setSubmission}/>
  )
  
  const getRadioButtonComponent = (submission, setSubmission) => (
    <RadioButtonSubmission submission={submission} setSubmission={setSubmission}/>
  )

  const getCheckboxComponent = (submission, setSubmission) => (
    <CheckboxSubmission submission={submission} setSubmission={setSubmission}/>
  )

  var componentMap = {
    [ProblemType.Text] : getTextComponent,
    [ProblemType.RadioButton] : getRadioButtonComponent,
    [ProblemType.Checkbox] : getCheckboxComponent
  }

  return (
    <div>
      <h2 className='text-info'> Create new quiz </h2>
      <Form.Label> Title: </Form.Label>
      <Form.Control type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' placeholder="Enter title"/>

      <Form.Label> Description: </Form.Label>
      <Form.Control as='textarea' value={description} onChange={({ target }) => setDescription((target as HTMLTextAreaElement).value)} rows='10' placeholder="Enter description"/>

      <div>
        {problems.map (problem =>
          <div key = {problem.id}>
            <h3> Problem {problem.id} </h3>
            <TextStatement statement={problem.statement} setStatement={statement => setProblem ({...problem, statement})}/>
            {componentMap[problem.submission.type](problem.submission, submission => setProblem ({...problem, submission}))}
          </div> )}
      </div>

      <button className="btn btn-primary" type="submit" onClick={addTextProblem}> {`Text`} </button>
      <button className="btn btn-primary" type="submit" onClick={addRadioButtonProblem}> {`RadioButton`} </button>
      <button className="btn btn-primary" type="submit" onClick={addCheckboxProblem}> {`Checkbox`} </button>

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