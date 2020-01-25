import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './Menu'
import Quiz from './Quiz'
import Quizzes from './Quizzes'
import QuizForm from './QuizForm'
import Login from './Login'
import Signup from './Signup'

import { initQuizzes } from '../reducers/quizzesReducer'
import { initUser } from '../reducers/userReducer'
import { initSubmissions } from '../reducers/submissionsReducer'


const App = ({ initUser, initQuizzes, initSubmissions, user }) => {
  useEffect(() => {initUser ()}, [initUser])
  useEffect(() => {initQuizzes()}, [initQuizzes])
  useEffect(() => { if (user) initSubmissions() }, [initSubmissions, user])

  return (
    <div className='container'>
      <Router>
        <Menu/>
        <Route exact path="/" render={() => <Quizzes />} />
        <Route exact path="/create" render={() => <QuizForm />} />
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
  initSubmissions: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapDispatchToProps = {
  initQuizzes,
  initUser,
  initSubmissions,
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