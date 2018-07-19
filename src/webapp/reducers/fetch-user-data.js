import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_SUCCESS,
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  FETCH_USER_DATA_BY_ID_REQUEST,
  FETCH_USER_DATA_BY_ID_FAILURE,
  FETCH_USER_DATA_BY_ID_SUCCESS
} from 'constants';

const initialState =  {
  id: '',
  name: '',
  tasks: []
};

export const userData = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_DATA_REQUEST:
      return state;
    case FETCH_USER_DATA_FAILURE:
      return state;
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        tasks: payload.tasks
      }
    case FETCH_USER_DATA_BY_ID_REQUEST:
      return state;
    case FETCH_USER_DATA_BY_ID_FAILURE:
      return state;
    case FETCH_USER_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        tasks: payload.tasks
      }
    case DELETE_TASK:
      return state;
    case DELETE_TASK_FAILURE:
      return state;
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload
      };
    case ADD_TASK:
      return state;
    case ADD_TASK_FAILURE:
      return state;
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload
      };
    default:
      return state;
  }
};
