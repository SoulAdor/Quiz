import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { createAnswer } from '../reducers/answersReducer'
import TextAnswer from './Answers/TextAnswer'
import CheckboxesAnswer from './Answers/CheckboxesAnswer'
import MultipleChoiceAnswer from './Answers/MultipleChoiceAnswer'

import { Form, Button } from 'react-bootstrap'

const Quiz = ({ quiz, createAnswer }) => {
  const [answers, setAnswers] = useState ({
    textAnswers : [],
    checkboxesAnswers : [],
    multipleChoiceAnswers : []
  })

  useEffect(() => {
    if (quiz) {
      quiz.questions.forEach (question => {
        const answer = {
          questionId : question.id
        }
        switch (question.type) {
        case 'TEXT':
          answer.answer = ''
          setAnswers ({...answers, textAnswers : [...answers.textAnswers, answer]})
          break
        case 'CHECKBOXES':
          if (question.answers) {
            answer.answers = question.answers.map (question => {
              return {
                correct : false,
                questionId : question.id 
              }
            })
            setAnswers ({...answers, checkboxesAnswers : [...answers.checkboxesAnswers, answer]})
          }
          break
        case 'MULTIPLE_CHOICE':
          if (question.answers) {
            answer.answers = question.answers.map (question => {
              return {
                correct : false,
                questionId : question.id 
              }
            })
            setAnswers ({...answers, multipleChoiceAnswers : [...answers.multipleChoiceAnswers, answer]})
          }
          break
        default:
          alert ('Wrong queston type')
        }
      })
    }
  }, [quiz])

  if (!quiz) return null

  const setTextAnswer = (newTextAnswer) => {
    const newTextAnswers = answers.textAnswers.map (textAnswer => textAnswer.id === newTextAnswer.id ? newTextAnswer : textAnswer)
    setAnswers ({...answers, textAnswers : newTextAnswers})
  }

  const setCheckboxesAnswer = (newCheckboxesAnswer) => {
    const newCheckboxesAnswers = answers.checkboxesAnswers.map (checkboxesAnswer => checkboxesAnswer.id === newCheckboxesAnswer.id ? newCheckboxesAnswer : checkboxesAnswer)
    setAnswers ({...answers, checkboxesAnswers : newCheckboxesAnswers})
  }

  const setMultipleChoiceAnswer = (newMultipleChoiceAnswer) => {
    const newMultipleChoiceAnswers = answers.multipleChoiceAnswers.map (multipleChoiceAnswer => multipleChoiceAnswer.id === newMultipleChoiceAnswer.id ? newMultipleChoiceAnswer : multipleChoiceAnswer)
    setAnswers ({...answers, multipleChoiceAnswers : newMultipleChoiceAnswers})
  }

  const getTextAnswer = questionId => {
    return answers.textAnswers.find (answer => answer.questionId === questionId)
  }

  const getCheckboxesAnswer = questionId => {
    return answers.checkboxesAnswers.find (answer => answer.questionId === questionId)
  }

  const getMultipleChoiceAnswer = questionId => {
    return answers.multipleChoiceAnswers.find (answer => answer.questionId === questionId)
  }

  const getQuestion = question => {
    switch (question.type) {
    case 'TEXT':
      const textAnswer = getTextAnswer(question.id)
      return textAnswer ? <TextAnswer question={question} answer={textAnswer} setAnswer={setTextAnswer}/> : null
    case 'CHECKBOXES':
      const checkboxesAnswer = getCheckboxesAnswer(question.id)
      return checkboxesAnswer ? <CheckboxesAnswer question={question} answer={checkboxesAnswer} setAnswer={setCheckboxesAnswer}/> : null
    case 'MULTIPLE_CHOICE':
      console.log(answers)
      const multipleChoiceAnswer = getMultipleChoiceAnswer(question.id)
      return multipleChoiceAnswer ? <MultipleChoiceAnswer question={question} answer={multipleChoiceAnswer} setAnswer={setMultipleChoiceAnswer}/> : null
    default:
      alert ('Wrong queston type')
      return null
    }
  }

  const submitAnswer = event => {
    event.preventDefault()
    const answer = {
      quiz: quiz.id,
      textAnswers : answers.textAnswers,
      checkboxAnswers : answers.checkboxAnswers,
      multipleChoiceAnswers : answers.multipleChoiceAnswers
    }
    console.log(answer)
  }

  return (
    <>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {quiz.questions.map (question => 
        <div key={question.id}> 
          <p>{question.question}</p>
          {getQuestion (question)}
        </div>
      )}

      <Form onSubmit={submitAnswer}> <Button variant='primary' type ='sumbit'> Submit </Button> </Form>
    </>
  )
}

const mapDispatchToProps = {
  createAnswer
}

const mapStateToProps = (state, ownProps) => {
  return {
    quiz: state.quizzes.find(quiz => quiz.id === ownProps.id),
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)