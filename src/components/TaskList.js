import React, { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { connect } from "react-redux"
import { fetchTasks, deleteTask } from "../actions/index"

const TaskList = props => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (props.token) {
      fetchTasks(props.token)
        .then(res => {
          setTasks(res.data)
        })
        .catch(err => console.log(err.response))
    }
  }, [props.token])

  const handleDelete = _id => {
    deleteTask(_id, props.token)
      .then(res => {
        fetchTasks(props.token)
          .then(res => {
            setTasks(res.data)
          })
          .catch(err => console.log(err.response))
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div className="m-5  d-flex align-items-center flex-column">
      {!props.token && (
        <>
          <h1>Please Login First</h1>
          <LinkContainer to="/login">
            <Button size="lg">Login</Button>
          </LinkContainer>
        </>
      )}
      <div className="d-flex flex-column align-items-center">
        {props.token && tasks.length > 0 && (
          <>
            <h2>Your Tasks :</h2>
            <div className="mt-5">
              {tasks.map(task => (
                <Card.Body
                  className="d-flex justify-content-between border-bottom"
                  key={task._id}
                >
                  {task.description}
                  <button
                    onClick={() => {
                      handleDelete(task._id)
                    }}
                    type="button"
                    className="mx-2 btn-close"
                    aria-label="Close"
                  ></button>
                </Card.Body>
              ))}
            </div>
          </>
        )}
        {props.token && (
          <LinkContainer to="/create">
            <Button className="mt-5" size="lg">
              Create Task
            </Button>
          </LinkContainer>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}
export default connect(mapStateToProps)(TaskList)
