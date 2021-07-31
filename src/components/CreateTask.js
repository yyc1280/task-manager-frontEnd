import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { createTask } from "../actions/index"
import { useHistory } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

const CreateTask = props => {
  const history = useHistory()
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"))

  const handleDescription = e => {
    setDescription(e.target.value)
  }

  const handleCreate = e => {
    e.preventDefault()
    setLoading(true)
    createTask(description, props.token)
      .then(response => {
        history.push("/tasks")
      })
      .catch(e => {
        console.log(e.response)
      })
  }

  return (
    <div className="m-5  d-flex align-items-center flex-column text-light">
      {!token ? (
        <>
          <h1 className="my-5">Please Login First</h1>
          <LinkContainer to="/login">
            <Button size="lg">Login</Button>
          </LinkContainer>
        </>
      ) : (
        <Form onSubmit={handleCreate} className="w-75">
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={handleDescription}
              type="text"
              placeholder="Task Description"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      )}
      {loading && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
