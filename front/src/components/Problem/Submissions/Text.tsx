import React from 'react'

const Text = ({ submissionForm, submission, setSubmission, submitted }) => {
  const changeText = text => {
    setSubmission ({...submission, text})
  }

  return (
    <div>
      <textarea value={submission.text} readOnly={submitted ? true : false } onChange={submitted ? null : ({ target }) => changeText(target.value)} placeholder='Type your submission'/>
    </div>
  )
}

export default Text
