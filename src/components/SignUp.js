import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { createUser, removeMsg } from "../actions/index"
import { useHistory } from "react-router-dom"

const SignUp = props => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    props.removeMsg()
  }, [])
  useEffect(() => {
    if (props.token) {
      history.push("/")
    }
  }, [props.token, history])

  const handleName = e => {
    setName(e.target.value)
  }
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleSignUp = e => {
    e.preventDefault()
    props.createUser(name, email, password)
  }

  return (
    <div className="m-5 d-flex justify-content-center">
      <Form onSubmit={handleSignUp} className="w-75">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleName}
            type="text"
            placeholder="Your name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleEmail}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {props.msg && <div className="alert alert-danger">{props.msg}</div>}
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    msg: state.user.msg,
    token: state.user.token,
  }
}
export default connect(mapStateToProps, { createUser, removeMsg })(SignUp)
