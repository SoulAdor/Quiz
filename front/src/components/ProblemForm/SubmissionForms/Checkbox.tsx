import React from 'react'

import { useCounter } from '../../../hooks/useCounter'
import Option from './Option'

import { Button } from 'react-bootstrap'

const Checkbox = ({ submission, setSubmission }) => {
  const idCounter = useCounter (1)

  const addOption = () => {
    const newOption = { id : idCounter.nextValue(), text : '', correct : false }
    const newOptions = [...submission.options, newOption]
    setSubmission ({ ...submission, options : newOptions })
  }

  const setOption = newOption => {
    const newOptions = submission.options.map (option => option.id === newOption.id ? newOption : option )
    setSubmission ({ ...submission, options : newOptions })
  }

  return (
    <div>
      {submission.options.map (option =>
        <Option key={option.id} option={option} setOption={setOption}/>
      )}
      <Button variant='primary' onClick={addOption}> Add option </Button>
    </div>
  )
}

export default Checkbox
