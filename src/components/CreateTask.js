import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { createTask } from "../actions/index"
import { useHistory } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

const CreateTask = props => {
  const history = useHistory()
  const [description, setDescription] = useState("")
  const token = JSON.parse(localStorage.getItem("token"))

  const handleDescription = e => {
    setDescription(e.target.value)
  }

  const handleCreate = e => {
    e.preventDefault()
    createTask(description, props.token)
      .then(response => {
        history.push("/tasks")
      })
      .catch(e => {
        console.log(e.response)
      })
  }

  return (
    <div className="m-5  d-flex align-items-center flex-column">
      {!token && (
        <>
          <h1>Please Login First</h1>
          <LinkContainer to="/login">
            <Button size="lg">Login</Button>
          </LinkContainer>
        </>
      )}
      {token && (
        <Form onSubmit={handleCreate} className="w-75">
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={handleDescription}
              type="text"
              placeholder="Task"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}
export default connect(mapStateToProps)(CreateTask)
