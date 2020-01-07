import React from 'react'
import PropTypes from 'prop-types'
import Answer from './Answer'
import { useCounter } from '../../hooks/useCounter'
import { Button } from 'react-bootstrap'

const CreateQuizMultipleChoice = ({ multipleChoiceQuestion, setMultipleChoiceQuestion }) => {
  const idCounter = useCounter (1)

  const setQuestion = question => {
    setMultipleChoiceQuestion ({ ...multipleChoiceQuestion, question : question })
  }

  const addAnswer = () => {
    const newAnswer = { id : idCounter.nextValue(), answer : '', correct : false }
    const newAnswers = [...multipleChoiceQuestion.answers, newAnswer]
    setMultipleChoiceQuestion ({ ...multipleChoiceQuestion, answers : newAnswers })
  }

  const setAnswer = newAnswer => {
    const newAnswers = multipleChoiceQuestion.answers.map (answer => answer.id === newAnswer.id ? newAnswer : answer)
    setMultipleChoiceQuestion ({ ...multipleChoiceQuestion, answers : newAnswers })
  }

  return (
    <>
      <textarea type='text' value={multipleChoiceQuestion.question} onChange={({ target }) => setQuestion(target.value)} placeholder='Type your Question'/>

      {multipleChoiceQuestion.answers.map (answer =>
        <Answer key={answer.id} answer={answer} setAnswer={setAnswer}/>
      )}

      <Button variant='primary' onClick={addAnswer}> Add answer </Button>
    </>
  )
}

CreateQuizMultipleChoice.propTypes = {
  multipleChoiceQuestion: PropTypes.object.isRequired,
  setMultipleChoiceQuestion: PropTypes.func.isRequired
}

export default CreateQuizMultipleChoice
