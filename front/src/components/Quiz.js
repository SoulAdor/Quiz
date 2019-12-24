import React from 'react'
import { Form, Button } from 'react-bootstrap'

const TextQuestion = ({}) => (
  <textarea></textarea>
)

const MultipleChoiceQuestion = ({answers}) => (
  <>
    { answers.map (answer =>
      <div key={answer.id}>
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
        <label class="form-check-label" for="defaultCheck1">{answer.answer}</label>
      </div>
    )}
  </>
)

const CheckboxesQuestion = ({answers}) => (
  <>
    { answers.map (answer =>
      <div key={answer.id}>
        <input class="form-check-input" type="radio" value="" id="defaultCheck1"/>
        <label class="form-check-label" for="defaultCheck1">{answer.answer}</label>
      </div>
    )}
  </>
)

const Question = ({question}) => {
  switch (question.type) {
    case 'TEXT':
      return <TextQuestion/>
    case 'MULTIPLE_CHOICE':
      return <MultipleChoiceQuestion answers={question.answers}/>
    case 'CHECKBOXES':  
      return <CheckboxesQuestion answers={question.answers}/>
    default:
      return null;
  }
}

const Quiz = ({quiz}) => (
  <Form onSubmit={null}>
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

export default Quiz
