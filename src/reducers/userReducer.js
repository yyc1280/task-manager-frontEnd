import {
  CREATE_USER,
  CREATE_USER_FAILED,
  LOGIN,
  LOGOUT,
  LOGIN_FAILED,
  LOAD_USER,
  REMOVE_MSG,
} from "../actions/types"

const INITIAL_STATE = {
  user: null,
  msg: null,
  token: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case CREATE_USER_FAILED:
      return { ...state, msg: action.payload }
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case LOGIN_FAILED:
      return { ...state, msg: action.payload }
    case LOGOUT:
      return { ...state, user: null, token: null }
    case LOAD_USER:
      return { ...state, token: action.payload }
    case REMOVE_MSG:
      return { ...state, msg: null }

    default:
      return state
  }
}

export default authReducer
