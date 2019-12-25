import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Quiz from './Quiz'
import Quizzes from './Quizzes'
import Menu from './Menu'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { initQuizzes } from '../reducers/quizzesReducer'

const App = ({ user, initQuizzes }) =>  {
  useEffect(() => {initQuizzes()}, [initQuizzes])

  return (
    <div className='container'>
      <Router>
        <Menu/>
        <Route exact path="/" render={() => <Quizzes />} />
        <Route exact path="/quizzes/:id" render={({ match }) =>
          <Quiz id={match.params.id} />
        } />
      </Router>
    </div>
  )
}

App.propTypes = {
  user: PropTypes.object,
  initQuizzes: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  initQuizzes
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)