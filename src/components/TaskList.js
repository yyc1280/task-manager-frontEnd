import React, { useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { connect } from "react-redux"
import { fetchTasks, deleteTask, updateTask } from "../actions/index"

const TaskList = props => {
  useEffect(() => {
    if (props.token) {
      props.fetchTasks()
    }
  }, [props.token])

  const handleDelete = _id => {
    deleteTask(_id, props.token)
      .then(res => {
        props.fetchTasks()
      })
      .catch(err => console.log(err.response))
  }

  const handleComplete = task => {
    props.updateTask(task)
  }

  return (
    <div className="m-2 d-flex align-items-center flex-column text-light">
      {!props.token && (
        <>
          <h1 className="my-5">Please Login First</h1>
          <LinkContainer to="/login">
            <Button size="lg">Login</Button>
          </LinkContainer>
        </>
      )}
      <div className="d-flex flex-column align-items-center">
        {props.token && (
          <>
            <h3>Your Tasks :</h3>
            {props.loading && props.tasks.length === 0 && (
              <div className="spinner-border text-light mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {props.tasks.length > 0 && (
              <>
                <div className="mt-3">
                  {props.tasks.map(task => (
                    <Card.Body
                      className="d-flex justify-content-between border-bottom"
                      key={task._id}
                    >
                      <input
                        onChange={() => {
                          handleComplete(task)
                        }}
                        className="form-check-input mx-3"
                        type="checkbox"
                        checked={task.completed}
                        value=""
                        id="flexCheckDefault"
                      ></input>
                      <span
                        className={task.completed ? "text-muted" : "text-light"}
                      >
                        {task.description}
                      </span>

                      <button
                        onClick={() => {
                          handleDelete(task._id)
                        }}
                        type="button"
                        className="mx-4 btn-close btn-close-white"
                        aria-label="Close"
                      ></button>
                    </Card.Body>
                  ))}
                </div>
              </>
            )}

            <LinkContainer to="/create">
              <Button className="mt-5" size="lg">
                Create Task
              </Button>
            </LinkContainer>
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    tasks: state.task.tasks,
    loading: state.task.loading,
  }
}
export default connect(mapStateToProps, { fetchTasks, updateTask })(TaskList)
