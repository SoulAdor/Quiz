import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import { useCounter } from '../hooks/useCounter'
import { createQuiz } from '../reducers/quizzesReducer'
import CreateQuizText from './CreateQuiz/CreateQuizText'
import CreateQuizCheckboxes from './CreateQuiz/CreateQuizCheckboxes'
import CreateQuizMultipleChoice from './CreateQuiz/CreateQuizMultipleChoice'

import { Form, Button } from 'react-bootstrap'

const CreateQuiz = ({ createQuiz, history }) => {
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState ('')
  const [questions, setQuestions] = useState ([])
  const idCounter = useCounter (1)

  const setQuestion = updatedQuestion => {
    setQuestions (questions.map (question => question.id === updatedQuestion.id ? updatedQuestion : question))
  }

  const getQuestionComponent = question => {
    switch(question.type) {
    case 'CHECKBOXES':
      return <CreateQuizCheckboxes checkboxesQuestion={question} setCheckboxesQuestion={setQuestion}/>
    case 'MULTIPLE_CHOICE':
      return <CreateQuizMultipleChoice multipleChoiceQuestion={question} setMultipleChoiceQuestion={setQuestion}/>
    case 'TEXT':
      return <CreateQuizText textQuestion={question} setTextQuestion={setQuestion}/>
    default:
      alert('Wrong type')
      return null
    }
  }

  const AddClicked = async (event) => {
    console.log('add')
    return
    /*
    let nextQuestion = {}
    switch(questionType) {
    case 'Checkboxes':
      nextQuestion.type = 'CHECKBOXES'
      nextQuestion.answers = []
      break
    case 'Multiple choice':
      nextQuestion.type = 'MULTIPLE_CHOICE'
      nextQuestion.answers = []
      break
    case 'Text':
      nextQuestion.type = 'TEXT'
      break
    default:
      alert('Wrong type')
      return
    }
    nextQuestion.id = idCounter.nextValue()
    setQuestions ([...questions, nextQuestion])
    */
  }
  const AddTextProblem = () => {
    console.log('Adding Text Problem')
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newQuiz = { title, description, questions }
    await createQuiz(newQuiz)
    alert('Your quiz has been added to database')
    history.push('/')
  }

  return (
    <div>
      <h2 className='text-info'> Create new quiz </h2>
      <Form.Label> Title: </Form.Label>
      <Form.Control type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' placeholder="Enter title"/>

      <Form.Label> Description: </Form.Label>
      <Form.Control as='textarea' value={description} onChange={({ target }) => setDescription((target as HTMLTextAreaElement).value)} rows='10' placeholder="Enter description"/>

      <div>
        {questions.map (question =>
          <div key = {question.id}>
            <h3> Question {question.id} </h3>
            {getQuestionComponent (question)}
          </div> )}
      </div>

      <button className="btn btn-primary" type="submit" onClick={AddTextProblem}> {`Text`} </button>
      <button className="btn btn-primary" type="submit"> {`RadioButton`} </button>
      <button className="btn btn-primary" type="submit"> {`Checkbox`} </button>

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