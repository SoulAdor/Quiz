import React, { useState, useEffect } from 'react'
import Quiz from './Quiz'
import Menu from './Menu'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  const [ quiz, setQuiz ] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/quizzes').then(response => {
      const quizzes = response.data
      setQuiz(quizzes[0])
    })
  }, []);

  if (!quiz) return null
  return (
    <div className='container'>
      <Router>
        <Menu/>
        <Quiz quiz = {quiz}></Quiz>
      </Router>
    </div>
  )
}

export default App
