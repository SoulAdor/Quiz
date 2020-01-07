import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCounter } from '../../hooks/useCounter'
import CreateQuizText from './CreateQuizText'
import CreateQuizCheckboxes from './CreateQuizCheckboxes'
import CreateQuizMultipleChoice from './CreateQuizMultipleChoice'
import { Form, Button } from 'react-bootstrap'

const CreateQuiz = ({ createQuiz }) => {
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState ('')
  const [questionType, setQuestionType] = useState ('Checkboxes')
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
  }
  
  const handleCreate = async (event) => {
    event.preventDefault()
    const newQuiz = { title, description, questions }
    await createQuiz(newQuiz)
  }

  return (
    <div>
      <h2 className='text-info'> Create new quiz </h2>
      <Form.Label> Title: </Form.Label>
      <Form.Control type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' placeholder="Enter title"/>

      <Form.Label> Description: </Form.Label>
      <Form.Control as='textarea' value={description} onChange={({ target }) => setDescription(target.value)} rows='10' placeholder="Enter description"/>

      <div>
        {questions.map (question =>
          <div key = {question.id}>
            <h3> Question {question.id} </h3>
            {getQuestionComponent (question)}
          </div> )}
      </div>

      <Form.Label> Choose next question type: </Form.Label>
      <select className="selectpicker show-tick" onChange={({ target }) => setQuestionType(target.value)}  data-style="btn-info">
        <option defaultValue> Checkboxes </option>
        <option> Multiple choice </option>
        <option> Text </option>
      </select>
      <Button variant='secondary' onClick={AddClicked}> Add question </Button>

      <Form onSubmit={handleCreate}>
        <Button variant='primary' type ='sumbit'> Create </Button>
      </Form>
    </div>
  )
}

CreateQuiz.propTypes = {
  createQuiz: PropTypes.func.isRequired
}

export default CreateQuiz
