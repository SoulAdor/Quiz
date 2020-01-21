import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Quizzes = ({ quizzes }) => {
  return (
    <ul>
      {quizzes.map (quiz =>
        <h2 key={quiz.id}>
          <Link to={`/quizzes/${quiz.id}`}> {quiz.title} </Link>
        </h2>
      )}
    </ul>
  )
}

Quizzes.propTypes = {
  quizzes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    quizzes: state.quizzes
  }
}

export default connect(
  mapStateToProps
)(Quizzes)
