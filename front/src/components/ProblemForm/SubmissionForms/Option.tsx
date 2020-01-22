import React from 'react'
import { Button } from 'react-bootstrap'

const Option = ({ option, setOption }) => (
  <div>
    <input type='text' value={option.text} onChange={({ target }) => setOption ({ ...option, text: target.value })} placeholder='Type your Answer'/>
    <Button variant='secondary' onClick={() => setOption ({ ...option, correct : !option.correct })}> 
      {option.correct ? 'Correct' : 'Incorrect'} 
    </Button>
  </div>
)

export default Option
