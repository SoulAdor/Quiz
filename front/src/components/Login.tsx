import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { logInUser } from '../reducers/userReducer'

const Login = ( {logInUser, history} ) => {
  const submitPressed = (event) => {
    event.preventDefault()
    logInUser ({ username: event.target.username.value, password: event.target.password.value })
    history.push('/')
  }

  return (
    <Form onSubmit={submitPressed}>
      <Form.Group>
        <Form.Label> Username: </Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter username"/>
      </Form.Group>
      <Form.Group>
        <Form.Label> Password: </Form.Label>
        <Form.Control type="password" name="password" placeholder="Enter password"/>
      </Form.Group>
      <Form.Group>
        <button className="btn btn-primary" type="submit">{`Log in`}</button>
      </Form.Group>
    </Form>
  )
}

Login.propTypes = {
  logInUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logInUser
}

export default withRouter (connect(
  null,
  mapDispatchToProps
)(Login) )
