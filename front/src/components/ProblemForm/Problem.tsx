import React from 'react'

import TextSubmission from './SubmissionForms/Text'
import RadioButtonSubmission from './SubmissionForms/RadioButton'
import CheckboxSubmission from './SubmissionForms/Checkbox'

import TextStatement from './StatementForms/Text'

const paddingStyle = {
  padding: "10px",
}

export enum SubmissionType {
  Text,
  RadioButton,
  Checkbox
}

export const getProblem = (id : number, submissionType : SubmissionType) => {
  return {
    id,
    statement : '',
    submission: {
      type : submissionType,
      options : []
    }
  }
}

const getTextComponent = (submission, setSubmission) => (
  <TextSubmission submission={submission} setSubmission={setSubmission}/>
)

const getRadioButtonComponent = (submission, setSubmission) => (
  <RadioButtonSubmission submission={submission} setSubmission={setSubmission}/>
)

const getCheckboxComponent = (submission, setSubmission) => (
  <CheckboxSubmission submission={submission} setSubmission={setSubmission}/>
)

const componentMap = {
  [SubmissionType.Text] : getTextComponent,
  [SubmissionType.RadioButton] : getRadioButtonComponent,
  [SubmissionType.Checkbox] : getCheckboxComponent
}

export const Problem = ({ problem, setProblem }) => {
  return (
    <div>
      <h3 className='d-flex justify-content-center' style={paddingStyle}> Problem {problem.id} </h3>
      <div className='d-flex justify-content-center' style={paddingStyle}>
        <TextStatement statement={problem.statement} setStatement={statement => setProblem ({...problem, statement})}/>
      </div> 
      <div className='d-flex justify-content-center' style={paddingStyle}>
        {componentMap[problem.submission.type](problem.submission, submission => setProblem ({...problem, submission}))}
      </div> 
    </div> 
)}