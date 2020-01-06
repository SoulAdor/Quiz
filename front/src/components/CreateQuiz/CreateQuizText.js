import React from 'react'
import PropTypes from 'prop-types'

const CreateQuizText = ({ textQuestion, setTextQuestion }) => {
  const setQuestion = question => {
    setTextQuestion ({ ...textQuestion, question : question })
  }

  return (
    <>
      <textarea type='text' value={textQuestion.question} onChange={({ target }) => setQuestion(target.value)} placeholder='Type your question'/>
    </>
  )
}

CreateQuizText.propTypes = {
  textQuestion: PropTypes.object.isRequired,
  setTextQuestion: PropTypes.func.isRequired
}

export default CreateQuizText
