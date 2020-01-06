import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import Answer from './Answer'
import { useCounter } from '../../hooks/useCounter'

const CreateQuizCheckboxes = ({ checkboxesQuestion, setCheckboxesQuestion }) => {
  const idCounter = useCounter (1)

  const setQuestion = question => {
    setCheckboxesQuestion ({ ...checkboxesQuestion, question : question })
  }

  const addAnswer = () => {
    const newAnswer = { id : idCounter.nextValue(), answer : '', correct : false }
    const newAnswers = [...checkboxesQuestion.answers, newAnswer]
    setCheckboxesQuestion ({ ...checkboxesQuestion, answers : newAnswers })
  }

  // If given new Answer is correct, make others incorrect and update correctAnswerId of question
  const setAnswer = newAnswer => {
    const newAnswers = checkboxesQuestion.answers.map (answer =>
      answer.id === newAnswer.id ? newAnswer :
        newAnswer.correct ? { ...answer, correct : false } : answer
    )
    let newQuestion = { ...checkboxesQuestion, answers : newAnswers }
    if (newAnswer.correct) newQuestion.correctAnswerId = newAnswer.id
    setCheckboxesQuestion (newQuestion)
  }

  return (
    <>
      <textarea type='text' value={checkboxesQuestion.question} onChange={({ target }) => setQuestion(target.value)} placeholder='Type your Question'/>

      {checkboxesQuestion.answers.map (answer =>
        <Answer key={answer.id} answer={answer} setAnswer={setAnswer}/>
      )}

      <Button variant='primary' onClick={addAnswer}> Add answer </Button>
    </>
  )
}

CreateQuizCheckboxes.propTypes = {
  checkboxesQuestion: PropTypes.object.isRequired,
  setCheckboxesQuestion: PropTypes.func.isRequired
}

export default CreateQuizCheckboxes
