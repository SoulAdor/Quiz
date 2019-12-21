import React from 'react'
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})

const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

export default App
