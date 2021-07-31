import React from "react"
import { connect } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Button } from "react-bootstrap"
import TaskList from "./TaskList"

const Home = props => {
  return (
    <div className="mt-3 mx-3 h-75 d-flex justify-content-center align-items-center text-light">
      <div className="w-60 d-flex flex-column">
        <h1 className="text-center">Welcome to Task Manager App</h1>
        <div className="d-flex justify-content-around mt-5">
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
