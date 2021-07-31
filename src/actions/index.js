import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CREATE_USER,
  CREATE_USER_FAILED,
  LOAD_USER,
  REMOVE_MSG,
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
} from "./types"
import url from "../apis/url"

export const createUser =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: LOGIN,
      payload: true,
    })
    try {
      const response = await url.post("/users", { name, email, password })
      localStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch({
        type: CREATE_USER,
        payload: {
          user: response.data.user,
          token: response.data.token,
          loading: false,
        },
      })
      window.alert("Sign Up Succeeded")
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILED,
        payload: error.response.data.name,
      })
    }
  }

export const login = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: LOGIN,
    payload: true,
  })
  try {
    const response = await url.post("/users/login", { email, password })
    localStorage.setItem("token", JSON.stringify(response.data.token))
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.user,
        token: response.data.token,
        loading: false,
      },
    })

    window.alert("Login Succeeded")
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: "Login Failed",
    })
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  return {
    type: LOGOUT,
  }
}

export const loadUser = () => {
  const token = JSON.parse(localStorage.getItem("token"))

  return {
    type: LOAD_USER,
    payload: token,
  }
}

export const removeMsg = () => {
  return {
    type: REMOVE_MSG,
  }
}

//tasks
export const fetchTasks = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_TASKS, payload: true })
  try {
    const response = await url.get("/tasks", {
      headers: { Authorization: "Bearer " + getState().user.token },
    })

    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: { tasks: response.data, loading: false },
    })
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILED,
      payload: "load tasks failed",
    })
  }
}

export const updateTask = task => async (dispatch, getState) => {
  const tasks = [...getState().task.tasks]
  tasks.forEach(t => {
    if (t._id === task._id) {
      t.completed = !t.completed
    }
  })
  dispatch({
    type: FETCH_TASKS_SUCCESS, //懶得創新的了
    payload: { tasks: tasks, loading: false },
  })

  try {
    const res = await url.patch(
      "/tasks/" + task._id,
      { completed: task.completed }, // 在上面被改過了所以不用!
      {
        headers: { Authorization: "Bearer " + getState().user.token },
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//not action
export const createTask = (description, token) => {
  return url.post(
    "/tasks",
    { description },
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
}

export const deleteTask = (_id, token) => {
  return url.delete(
    "/tasks/" + _id,

    {
      headers: { Authorization: "Bearer " + token },
    }
  )
}

// export const updateTask = (task, token) => {
//   return url.patch(
//     "/tasks/" + task._id,
//     { completed: !task.completed },

//     {
//       headers: { Authorization: "Bearer " + token },
//     }
//   )
// }
