import React from 'react'
import PropTypes from 'prop-types'

const MultipleChoiceAnswer = ({ question, answer, setAnswer }) => {
  return (
    <>
      { question.answers.map (answer => 
        <div key={answer.id}>
          <input type='checkboxes' name={question.id} value={answer.id}/>
          {answer.answer}
          <br/>
        </div>
      )}
    </>
  )
}

MultipleChoiceAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired
}

export default MultipleChoiceAnswer
