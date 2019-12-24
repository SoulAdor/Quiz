import React from 'react'
import axios from 'axios'

axios.get('http://localhost:3001/quizzes').then(response => {
  const quizzes = response.data
  console.log(quizzes)
})

const App = () => (
  <div className='container'>
    <p>Hello world</p>
  </div>
)

export default App
