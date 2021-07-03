import React from "react"
// import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { logout } from "../actions"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

const Header = props => {
  const history = useHistory()
  const handleLogout = () => {
    props.logout()
    history.push("/")
  }
  return (
    <Navbar className="navbar bg-light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Task Manager</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="position-relative" id="basic-navbar-nav">
          <Nav className="me-auto">
            {!props.token && (
              <>
                <LinkContainer to="/signUp">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </>
            )}
            {props.token && (
              <>
                <LinkContainer to="/tasks">
                  <Nav.Link>Task List</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create">
                  <Nav.Link>Create Task</Nav.Link>
                </LinkContainer>
                <Nav.Link
                  className="position-absolute end-0"
                  onClick={handleLogout}
                >
                  Log Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}

export default connect(mapStateToProps, { logout })(Header)
