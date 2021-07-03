import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { login, removeMsg } from "../actions/index"

import { useHistory } from "react-router-dom"

const Login = props => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    props.removeMsg()
  }, [])
  useEffect(() => {
    if (props.token) {
      history.push("/")
    }
  })

  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleLogin = e => {
    e.preventDefault()
    props.login(email, password)
  }
  return (
    <div className="m-5 d-flex justify-content-center">
      <Form onSubmit={handleLogin} className="w-75">
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
          Login
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
export default connect(mapStateToProps, { login, removeMsg })(Login)
