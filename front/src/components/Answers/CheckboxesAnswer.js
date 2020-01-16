import React from 'react'
import PropTypes from 'prop-types'

const CheckboxesAnswer = ({ question, answer, setAnswer }) => {
  return (
    <>
      { question.answers.map (answer => 
        <div key={answer.id}>
          <input type='radio' name={question.id} value={answer.id}/> 
          {answer.answer}
          <br/>
        </div>
      )}
    </>
  )
}

CheckboxesAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired
}

export default CheckboxesAnswer
