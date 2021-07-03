import React from "react"
import { connect } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Button } from "react-bootstrap"
import TaskList from "./TaskList"

const Home = props => {
  return (
    <div className="p-5 h-75 d-flex justify-content-center align-items-center">
      <div className="w-60 d-flex flex-column justify-content-around">
        <h1 className="mb-5">Welcome to Task Manager App</h1>
        <div className="d-flex justify-content-around">
          {!props.token && (
            <>
              <LinkContainer to="/signUp">
                <Button size="lg">Sign Up</Button>
              </LinkContainer>
              <LinkContainer to="/login">
                <Button size="lg">Login</Button>
              </LinkContainer>
            </>
          )}
          {props.token && (
            <div className="d-flex flex-column">
              <TaskList />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}
export default connect(mapStateToProps)(Home)
