import { createAction } from 'helpers/create-action';
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

export const fetchUserDataRequest = createAction(FETCH_USER_DATA_REQUEST);
export const fetchUserDataFailure = createAction(FETCH_USER_DATA_FAILURE);
export const fetchUserDataSuccess = createAction(FETCH_USER_DATA_SUCCESS);
export const addTask = createAction(ADD_TASK);
export const addTaskFailure = createAction(ADD_TASK_FAILURE);
export const addTaskSuccess = createAction(ADD_TASK_SUCCESS);
export const deleteTask = createAction(DELETE_TASK);
export const deleteTaskFailure = createAction(DELETE_TASK_FAILURE);
export const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS);
export const fetchUserDataByIdRequest = createAction(FETCH_USER_DATA_BY_ID_REQUEST);
export const fetchUserDataByIdFailure = createAction(FETCH_USER_DATA_BY_ID_FAILURE);
export const fetchUserDataByIdSuccess = createAction(FETCH_USER_DATA_BY_ID_SUCCESS);
