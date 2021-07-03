import {
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  CREATE_USER,
  CREATE_USER_FAILED,
  LOAD_USER,
  REMOVE_MSG,
} from "./types"
import url from "../apis/url"

export const createUser =
  (name, email, password) => async (dispatch, getState) => {
    try {
      const response = await url.post("/users", { name, email, password })
      localStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch({
        type: CREATE_USER,
        payload: response.data,
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
  try {
    const response = await url.post("/users/login", { email, password })
    localStorage.setItem("token", JSON.stringify(response.data.token))
    dispatch({
      type: LOGIN,
      payload: response.data,
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

export const fetchTasks = token => {
  return url.get(
    "/tasks",

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
