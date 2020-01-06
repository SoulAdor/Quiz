import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Answer = ({ answer, setAnswer }) => {
  const setAnswerText = text => {
    setAnswer ({ ...answer, answer : text })
  }

  const changeCorrectness = () => {
    setAnswer ({ ...answer, correct : !answer.correct })
  }

  return (
    <div>
      <input type='text' value={answer.answer} onChange={({ target }) => setAnswerText(target.value)} placeholder='Type your Answer'/>
      <Button variant='secondary' onClick={changeCorrectness}> {answer.correct ? 'Correct' : 'Incorrect'} </Button>
    </div>
  )
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired
}

export default Answer
