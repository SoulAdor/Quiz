import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, logOutUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="#" as="span">
        <Link to="/">Quizzes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link to="/create">Create</Link>
      </Nav.Link>
      <Nav className="ml-auto">
        <div className="navbar-text">{` ${user.name} logged in `}</div>
      </Nav>
      <Nav className="ml-auto">
        <Button type="button" onClick={logOutUser}>Log out</Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logOutUser
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)