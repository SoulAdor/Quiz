import React from 'react'

const optionStyle = {
  padding: "10px",
  margin: "10px",
  border: "solid",
  borderWidth : "2px",
}

const borderChosenColorStyle = {
  borderColor : 'blue'
}

const borderNotChosenColorStyle = {
  borderColor : 'grey'
}

const borderCorrectColorStyle = {
  borderColor : 'green'
}

const borderWrongColorStyle = {
  borderColor : 'red'
}

const CheckBox = ({ submissionForm, submission, setSubmission, submitted }) => {
  const changeChoice = userChoice => {
    const choices = submission.choices.map (choice => 
      choice.optionId === userChoice.optionId ? {...choice, chosen : !choice.chosen} : choice
    )
    setSubmission ({...submission, choices})
  }
  
  const getChoice = optionForm => {
    return submission.choices.find (choice => choice.optionId === optionForm.id)
  }

  return (
    <div>
      {submissionForm.options.map (option => {
        const userChoice = getChoice (option)
        const borderColor = submitted ?
          option.correct === userChoice.chosen ? borderCorrectColorStyle : borderWrongColorStyle : 
          userChoice.chosen ? borderChosenColorStyle : borderNotChosenColorStyle
        return (
          <div className="radio" style={{...optionStyle, ...borderColor}} key={option.id}>
            <label> <input type="checkbox" name={submission.id} readOnly={submitted ? true : false } onChange={submitted ? null : ()=>changeChoice(userChoice)} checked={userChoice.chosen}/> {option.text} </label>
          </div>
        )
      })}
    </div>
  )
  
}

export default CheckBox
