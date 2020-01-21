import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { signUpUser } from '../reducers/userReducer'

const Signup = ( {signUpUser, history} ) => {
  const submitPressed = async (event) => {
    event.preventDefault()
    await signUpUser ({ 
      username: event.target.username.value, 
      password: event.target.password.value,
      name: event.target.name.value 
    })
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
        <Form.Label> Name: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter your name"/>
      </Form.Group>
      <Form.Group>
        <button className="btn btn-primary" type="submit"> {`Sign up`} </button>
      </Form.Group>
    </Form>
  )
}

Signup.propTypes = {
  signUpUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  signUpUser
}

export default withRouter (connect(
  null,
  mapDispatchToProps
)(Signup))
