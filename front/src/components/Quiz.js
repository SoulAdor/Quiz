import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

const getId = (questionId, answerId) => `${questionId}/${answerId}`

const TextQuestion = ({ question }) => (
  <textarea id={getId(question.id, 1)}></textarea>
)

const MultipleChoiceQuestion = ({ question }) => (
  <>
    { question.answers.map (answer =>
      <div key={getId (question.id, answer.id)}>
        <input type='checkbox' name={question.id} value='' id={getId (question.id, answer.id)}/>
        <label htmlFor={getId (question.id, answer.id)}>{answer.answer}</label>
      </div>
    )}
  </>
)

const CheckboxesQuestion = ({ question }) => (
  <>
    { question.answers.map (answer =>
      <div key={getId (question.id, answer.id)}>
        <input type='radio' name={question.id} value='' id={getId (question.id, answer.id)}/>
        <label htmlFor={getId (question.id, answer.id)}>{answer.answer}</label>
      </div>
    )}
  </>
)

const Question = ({ question }) => {
  switch (question.type) {
  case 'TEXT':
    return <TextQuestion question={question}/>
  case 'MULTIPLE_CHOICE':
    return <MultipleChoiceQuestion question={question}/>
  case 'CHECKBOXES':
    return <CheckboxesQuestion question={question}/>
  default:
    return null
  }
}

const insertTextAnswer = (answer, question) => {
  const id = getId(question.id, 1)
  answer.answers.push( {
    'id' : question.id,
    'answer' : document.getElementById(id).value
  }
  )
}

const insertMultipleChoiceAnswer = (answer, question) => {
  let nextAnswer =  {
    'id' : question.id,
    'answer' : []
  }
  question.answers.forEach(answer => {
    const id = getId(question.id, answer.id)
    if (document.getElementById(id).checked) nextAnswer.answer.push(answer.id)
  }
  )
  answer.answers.push(nextAnswer)
}

const insertCheckboxesAnswer = (answer, question) => {
  let nextAnswer =  {
    'id' : question.id
  }
  question.answers.forEach(answer => {
    const id = getId(question.id, answer.id)
    if (document.getElementById(id).checked) nextAnswer.answer = answer.id
  }
  )
  answer.answers.push(nextAnswer)
}


const Quiz = ({ quiz }) => {
  if (!quiz) return null

  const submitClicked = event => {
    event.preventDefault()
    event.persist()
    let answer = {
      userId:  1,
      quizId:  quiz.id,
      answers: []
    }
    quiz.questions.map (question => {
      switch (question.type) {
      case 'TEXT':
        insertTextAnswer (answer, question)
        break
      case 'MULTIPLE_CHOICE':
        insertMultipleChoiceAnswer (answer, question)
        break
      case 'CHECKBOXES':
        insertCheckboxesAnswer (answer, question)
        break
      default:
        console.log('Unknown type')
        break
      }
    })
    console.log(answer)
  }

  return (
    <Form onSubmit={submitClicked}>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {
        quiz.questions.map (question =>
          <Form.Group key={question.id}>
            {question.question}
            <Question question={question}/>
          </Form.Group>)
      }
      <Form.Group>
        <Button variant='primary' type ='sumbit'> Submit </Button>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    quiz: state.quizzes.find(quiz => quiz.id === ownProps.id)
  }
}

export default connect(
  mapStateToProps
)(Quiz)
