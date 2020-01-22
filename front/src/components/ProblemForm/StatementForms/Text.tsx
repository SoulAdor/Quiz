import React from 'react'

const Text = ({statement, setStatement}) => (
  <textarea value={statement} onChange={({ target }) => setStatement(target.value)} placeholder='Type your statement'/>
)

export default Text
