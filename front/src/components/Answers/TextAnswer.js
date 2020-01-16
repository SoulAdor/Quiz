import React from 'react'
import PropTypes from 'prop-types'

const TextAnswer = ({ question, answer, setAnswer }) => {
  const updateAnswer = textAnswer => {
    setAnswer ({ ...answer, answer : textAnswer })
  }

  return (
    <>
      <textarea type='text' value={answer.answer} onChange={({ target }) => updateAnswer(target.value)} placeholder='Type your answer'></textarea>
    </>
  )
}

TextAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired
}

export default TextAnswer
