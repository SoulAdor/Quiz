import React from 'react'

import TextSubmission from './Submissions/Text'
import RadioButtonSubmission from './Submissions/RadioButton'
import CheckboxSubmission from './Submissions/Checkbox'

import TextStatement from './Statements/Text'

const paddingStyle = {
  padding: "5px",
}

export enum SubmissionType {
  Text,
  RadioButton,
  Checkbox
}

export const getInitSubmission = problem => {
  return {
    problemId : problem.id,
    type : problem.submission.type,
    text: '',
    choices : problem.submission.options.map (option => {
      return {
        optionId : option.id,
        chosen : false
      }
    })
  }
}

export const getInitSubmissions = problems => {
  return problems.map (problem => getInitSubmission(problem))
}

const getTextComponent = (submissionForm, submission, setSubmission, submitted) => (
  <TextSubmission submissionForm={submissionForm} submission={submission} setSubmission={setSubmission} submitted={submitted}/>
)

const getRadioButtonComponent = (submissionForm, submission, setSubmission, submitted) => (
  <RadioButtonSubmission submissionForm={submissionForm} submission={submission} setSubmission={setSubmission} submitted={submitted}/>
)

const getCheckboxComponent = (submissionForm, submission, setSubmission, submitted) => (
  <CheckboxSubmission submissionForm={submissionForm} submission={submission} setSubmission={setSubmission} submitted={submitted}/>
)

const componentMap = {
  [SubmissionType.Text] : getTextComponent,
  [SubmissionType.RadioButton] : getRadioButtonComponent,
  [SubmissionType.Checkbox] : getCheckboxComponent
}

export const Problem = ({ problem, submission, setSubmission, submitted }) => {
  return (
    <div>
      <div className="d-flex justify-content-center" style={paddingStyle}>
        <TextStatement statement={problem.statement}/>
      </div> 
      <div className="d-flex justify-content-center" style={paddingStyle}>
        {componentMap[problem.submission.type](problem.submission, submission, setSubmission, submitted)}
      </div> 
    </div> 
)}