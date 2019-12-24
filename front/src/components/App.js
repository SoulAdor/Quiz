import React, { useState, useEffect } from 'react'
import Quiz from './Quiz'
import axios from 'axios'




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
      <Quiz quiz = {quiz}></Quiz>
    </div>
  )
}

export default App
