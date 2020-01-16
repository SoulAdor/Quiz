import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './Menu'
import Quiz from './Quiz'
import Quizzes from './Quizzes'
import CreateQuiz from './CreateQuiz/CreateQuiz'
import Login from './Login'
import Signup from './Signup'

import { initQuizzes } from '../reducers/quizzesReducer'
import { initUser } from '../reducers/userReducer'
import { initAnswers } from '../reducers/answersReducer'

const App = ({ initUser, initQuizzes, initAnswers, user }) =>  {
  useEffect(() => {initUser ()}, [initUser])
  useEffect(() => {initQuizzes()}, [initQuizzes])
  useEffect(() => { if (user) initAnswers()}, [initAnswers, user])

  return (
    <div className='container'>
      <Router>
        <Menu/>
        <Route exact path="/" render={() => <Quizzes />} />
        <Route exact path="/create" render={() => <CreateQuiz />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/quizzes/:id" render={({ match }) =>
          <Quiz id={match.params.id} />
        } />
      </Router>
    </div>
  )
}

App.propTypes = {
  initQuizzes: PropTypes.func.isRequired,
  initUser: PropTypes.func.isRequired,
  initAnswers: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapDispatchToProps = {
  initQuizzes,
  initUser,
  initAnswers,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)