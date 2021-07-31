import {
  FETCH_TASKS,
  FETCH_TASKS_FAILED,
  FETCH_TASKS_SUCCESS,
} from "../actions/types"

const INITIAL_STATE = {
  tasks: [],
  loading: false,
}

const taskReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        loading: action.payload,
      }
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        loading: action.payload.loading,
      }
    case FETCH_TASKS_FAILED:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default taskReducer
